using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Microsoft.OpenApi.Readers;

namespace MockGenerator;

public record ParseResult(
    Dictionary<string, SchemaModel> Schemas,
    Dictionary<string, List<string>> Enums,
    List<EndpointModel> Endpoints,
    List<StoreEntity> StoreEntities);

public record SchemaModel(
    string Name,
    List<PropertyModel> Properties,
    bool IsPaginationWrapper,
    string? PaginationItemType);

public record PropertyModel(
    string Name,
    string CSharpType,
    bool IsNullable,
    bool IsCollection,
    string? ItemType,
    bool IsEnum,
    string? EnumTypeName,
    bool IsReference);

public record EndpointModel(
    string OperationId,
    string HttpMethod,
    string Path,
    string Tag,
    string? RequestBodyType,
    string? ResponseType,
    bool IsPaginatedResponse,
    string? PaginationItemType,
    List<ParameterModel> PathParameters,
    List<ParameterModel> QueryParameters);

public record ParameterModel(string Name, string CSharpType);

public record StoreEntity(string DtoName, string PluralName);

public static class SchemaParser
{
    private static readonly HashSet<string> VisitedSchemas = [];

    public static ParseResult Parse(string inputPath)
    {
        using var stream = File.OpenRead(inputPath);
        var reader = new OpenApiStreamReader();
        var document = reader.Read(stream, out var diagnostic);

        if (diagnostic.Errors.Count > 0)
        {
            foreach (var error in diagnostic.Errors)
            {
                Console.Error.WriteLine($"  OpenAPI warning: {error.Message}");
            }
        }

        var schemas = new Dictionary<string, SchemaModel>();
        var enums = new Dictionary<string, List<string>>();
        var paginationWrappers = new Dictionary<string, string>(); // wrapper name -> item type

        // First pass: identify enums and pagination wrappers
        foreach (var (name, schema) in document.Components.Schemas)
        {
            if (IsEnumSchema(schema))
            {
                enums[name] = schema.Enum!.OfType<OpenApiString>().Select(e => e.Value).ToList();
                continue;
            }

            var paginationItem = DetectPaginationWrapper(name, schema, document);
            if (paginationItem is not null)
            {
                paginationWrappers[name] = paginationItem;
            }
        }

        // Second pass: parse object schemas
        foreach (var (name, schema) in document.Components.Schemas)
        {
            if (enums.ContainsKey(name) || paginationWrappers.ContainsKey(name))
                continue;

            var properties = ParseProperties(schema, document, enums);
            schemas[name] = new SchemaModel(name, properties, false, null);
        }

        // Add pagination wrappers
        foreach (var (name, itemType) in paginationWrappers)
        {
            schemas[name] = new SchemaModel(name, [], true, itemType);
        }

        // Parse endpoints
        var endpoints = ParseEndpoints(document, schemas, paginationWrappers, enums);

        // Determine store entities (non-pagination, non-nested DTOs that appear in list endpoints)
        var storeEntities = DetermineStoreEntities(endpoints, schemas);

        return new ParseResult(schemas, enums, endpoints, storeEntities);
    }

    private static bool IsEnumSchema(OpenApiSchema schema)
    {
        return schema.Enum?.Count > 0 && schema.Type == "string";
    }

    private static string? DetectPaginationWrapper(
        string name, OpenApiSchema schema, OpenApiDocument document)
    {
        if (schema.Type != "object" || schema.Properties is null)
            return null;

        var hasItems = schema.Properties.Any(p =>
            p.Key.Equals("items", StringComparison.OrdinalIgnoreCase) &&
            p.Value.Type == "array");

        var hasTotal = schema.Properties.Any(p =>
            p.Key.Equals("total", StringComparison.OrdinalIgnoreCase));

        if (!hasItems || !hasTotal)
            return null;

        var itemsProp = schema.Properties
            .First(p => p.Key.Equals("items", StringComparison.OrdinalIgnoreCase));

        var itemSchema = itemsProp.Value.Items;
        if (itemSchema?.Reference is not null)
        {
            return itemSchema.Reference.Id;
        }

        return null;
    }

    private static List<PropertyModel> ParseProperties(
        OpenApiSchema schema, OpenApiDocument document,
        Dictionary<string, List<string>> enums)
    {
        var properties = new List<PropertyModel>();

        if (schema.AllOf?.Count > 0)
        {
            foreach (var allOfSchema in schema.AllOf)
            {
                var resolved = allOfSchema.Reference is not null
                    ? document.Components.Schemas[allOfSchema.Reference.Id]
                    : allOfSchema;
                properties.AddRange(ParseProperties(resolved, document, enums));
            }

            return properties;
        }

        if (schema.Properties is null)
            return properties;

        foreach (var (propName, propSchema) in schema.Properties)
        {
            var resolved = propSchema.Reference is not null
                ? document.Components.Schemas[propSchema.Reference.Id]
                : propSchema;

            var isNullable = propSchema.Nullable;
            var isEnum = false;
            string? enumTypeName = null;

            // Check if it's an enum reference
            if (propSchema.Reference is not null && enums.ContainsKey(propSchema.Reference.Id))
            {
                isEnum = true;
                enumTypeName = propSchema.Reference.Id;
            }
            else if (resolved.Enum?.Count > 0 && resolved.Type == "string")
            {
                isEnum = true;
                enumTypeName = propSchema.Reference?.Id;
            }

            var isCollection = resolved.Type == "array";
            string? itemType = null;
            var isReference = false;

            if (isCollection && resolved.Items is not null)
            {
                itemType = resolved.Items.Reference is not null
                    ? resolved.Items.Reference.Id
                    : MapType(resolved.Items);
                isReference = resolved.Items.Reference is not null;
            }
            else if (propSchema.Reference is not null && !isEnum)
            {
                isReference = true;
            }

            var csharpType = isEnum
                ? enumTypeName ?? "string"
                : isCollection
                    ? $"List<{itemType}>"
                    : isReference && propSchema.Reference is not null
                        ? propSchema.Reference.Id
                        : MapType(resolved);

            properties.Add(new PropertyModel(
                ToPascalCase(propName),
                csharpType,
                isNullable,
                isCollection,
                itemType,
                isEnum,
                enumTypeName,
                isReference));
        }

        return properties;
    }

    private static string MapType(OpenApiSchema schema)
    {
        return (schema.Type, schema.Format) switch
        {
            ("string", "date-time") => "DateTime",
            ("string", "date") => "DateOnly",
            ("string", "uuid") => "Guid",
            ("string", _) => "string",
            ("integer", "int64") => "long",
            ("integer", _) => "int",
            ("number", "float") => "float",
            ("number", "decimal") => "decimal",
            ("number", _) => "double",
            ("boolean", _) => "bool",
            _ => "string",
        };
    }

    private static List<EndpointModel> ParseEndpoints(
        OpenApiDocument document,
        Dictionary<string, SchemaModel> schemas,
        Dictionary<string, string> paginationWrappers,
        Dictionary<string, List<string>> enums)
    {
        var endpoints = new List<EndpointModel>();

        foreach (var (path, pathItem) in document.Paths)
        {
            foreach (var (method, operation) in pathItem.Operations)
            {
                var httpMethod = method.ToString().ToUpperInvariant();
                var tag = operation.Tags?.FirstOrDefault()?.Name ?? "Default";
                var operationId = operation.OperationId ?? GenerateOperationId(httpMethod, path);

                // Parse path parameters
                var pathParams = operation.Parameters
                    .Where(p => p.In == ParameterLocation.Path)
                    .Select(p => new ParameterModel(
                        ToPascalCase(p.Name),
                        MapType(p.Schema)))
                    .ToList();

                // Parse query parameters
                var queryParams = operation.Parameters
                    .Where(p => p.In == ParameterLocation.Query)
                    .Select(p => new ParameterModel(
                        ToPascalCase(p.Name),
                        MapType(p.Schema)))
                    .ToList();

                // Request body type
                string? requestBodyType = null;
                if (operation.RequestBody?.Content.TryGetValue("application/json", out var reqContent) == true)
                {
                    if (reqContent.Schema?.Reference is not null)
                    {
                        requestBodyType = reqContent.Schema.Reference.Id;
                    }
                }

                // Response type
                string? responseType = null;
                var isPaginated = false;
                string? paginationItemType = null;

                var successResponse = operation.Responses
                    .FirstOrDefault(r => r.Key.StartsWith("2"));

                if (successResponse.Value?.Content?.TryGetValue("application/json", out var resContent) == true)
                {
                    if (resContent.Schema?.Reference is not null)
                    {
                        var refId = resContent.Schema.Reference.Id;
                        if (paginationWrappers.TryGetValue(refId, out var itemType))
                        {
                            isPaginated = true;
                            paginationItemType = itemType;
                            responseType = refId;
                        }
                        else
                        {
                            responseType = refId;
                        }
                    }
                }

                endpoints.Add(new EndpointModel(
                    operationId,
                    httpMethod,
                    path,
                    tag,
                    requestBodyType,
                    responseType,
                    isPaginated,
                    paginationItemType,
                    pathParams,
                    queryParams));
            }
        }

        return endpoints;
    }

    private static List<StoreEntity> DetermineStoreEntities(
        List<EndpointModel> endpoints, Dictionary<string, SchemaModel> schemas)
    {
        var entities = new HashSet<string>();

        foreach (var ep in endpoints)
        {
            // A GET list endpoint with pagination indicates a store entity
            if (ep is { HttpMethod: "GET", IsPaginatedResponse: true, PaginationItemType: not null })
            {
                entities.Add(ep.PaginationItemType);
            }
            // A GET without path params returning a single type is also a list
            else if (ep is { HttpMethod: "GET", PathParameters.Count: 0, ResponseType: not null }
                     && schemas.ContainsKey(ep.ResponseType)
                     && !schemas[ep.ResponseType].IsPaginationWrapper)
            {
                entities.Add(ep.ResponseType);
            }
        }

        return entities.Select(e =>
        {
            var plural = e.EndsWith("y", StringComparison.Ordinal)
                ? e[..^1] + "ies"
                : e.EndsWith("s", StringComparison.Ordinal)
                    ? e + "es"
                    : e + "s";
            return new StoreEntity(e, plural);
        }).ToList();
    }

    private static string GenerateOperationId(string method, string path)
    {
        var segments = path.Split('/', StringSplitOptions.RemoveEmptyEntries)
            .Where(s => !s.StartsWith('{'))
            .Select(ToPascalCase);
        return method.ToLowerInvariant() switch
        {
            "get" => "Get" + string.Join("", segments),
            "post" => "Create" + string.Join("", segments),
            "put" => "Update" + string.Join("", segments),
            "delete" => "Delete" + string.Join("", segments),
            _ => method + string.Join("", segments),
        };
    }

    public static string ToPascalCase(string input)
    {
        if (string.IsNullOrEmpty(input))
            return input;

        // Already PascalCase
        if (char.IsUpper(input[0]) && !input.Contains('_') && !input.Contains('-'))
            return input;

        // camelCase -> PascalCase
        if (!input.Contains('_') && !input.Contains('-'))
            return char.ToUpperInvariant(input[0]) + input[1..];

        // snake_case or kebab-case -> PascalCase
        return string.Concat(
            input.Split(['_', '-'], StringSplitOptions.RemoveEmptyEntries)
                .Select(s => char.ToUpperInvariant(s[0]) + s[1..].ToLowerInvariant()));
    }
}
