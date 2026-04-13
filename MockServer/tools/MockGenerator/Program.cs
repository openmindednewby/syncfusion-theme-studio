using System.CommandLine;
using MockGenerator;

var inputOption = new Option<FileInfo>(
    name: "--input",
    description: "Path to the OpenAPI swagger.json file")
{ IsRequired = true };

var outputOption = new Option<DirectoryInfo>(
    name: "--output",
    description: "Output directory for generated files")
{ IsRequired = true };

var namespaceOption = new Option<string>(
    name: "--namespace",
    description: "Root namespace for generated code")
{ IsRequired = true };

var prefixOption = new Option<string>(
    name: "--prefix",
    description: "Route prefix for generated endpoints (e.g. /sample)")
{ IsRequired = true };

var seedCountOption = new Option<int>(
    name: "--seed-count",
    description: "Number of seed items to generate per entity",
    getDefaultValue: () => 25);

var rootCommand = new RootCommand("MockGenerator - generates FastEndpoints + DTOs + Bogus fakers from an OpenAPI spec")
{
    inputOption,
    outputOption,
    namespaceOption,
    prefixOption,
    seedCountOption,
};

rootCommand.SetHandler(Run, inputOption, outputOption, namespaceOption, prefixOption, seedCountOption);

return await rootCommand.InvokeAsync(args);

static void Run(FileInfo input, DirectoryInfo output, string ns, string prefix, int seedCount)
{
    if (!input.Exists)
    {
        Console.Error.WriteLine($"Input file not found: {input.FullName}");
        Environment.Exit(1);
    }

    Console.WriteLine($"Parsing OpenAPI spec: {input.FullName}");
    var parseResult = SchemaParser.Parse(input.FullName);

    Console.WriteLine($"  Found {parseResult.Schemas.Count} schemas, {parseResult.Endpoints.Count} endpoints");

    // Ensure output directory is clean
    if (output.Exists)
    {
        output.Delete(recursive: true);
    }

    output.Create();

    // Generate DTOs
    Console.WriteLine("Generating DTOs...");
    var dtoDir = Path.Combine(output.FullName, "Dtos");
    Directory.CreateDirectory(dtoDir);
    DtoGenerator.Generate(parseResult.Schemas, parseResult.Enums, $"{ns}.Dtos", dtoDir);

    // Generate Fakers
    Console.WriteLine("Generating Fakers...");
    var fakerDir = Path.Combine(output.FullName, "Fakers");
    Directory.CreateDirectory(fakerDir);
    FakerGenerator.Generate(parseResult.Schemas, parseResult.Enums, ns, fakerDir);

    // Generate Endpoints
    Console.WriteLine("Generating Endpoints...");
    var endpointDir = Path.Combine(output.FullName, "Endpoints");
    Directory.CreateDirectory(endpointDir);
    EndpointGenerator.Generate(parseResult.Endpoints, parseResult.StoreEntities, ns, prefix, endpointDir);

    // Generate Seed Data Store
    Console.WriteLine("Generating Seed Data Store...");
    SeedDataGenerator.Generate(parseResult.Schemas, parseResult.StoreEntities, ns, seedCount, output.FullName);

    Console.WriteLine($"Generation complete. Output: {output.FullName}");
}
