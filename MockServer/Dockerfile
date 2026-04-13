# Stage 1: Build the .NET 9 MockServer
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy project files first for layer caching
COPY src/MockServer.Core/MockServer.Core.csproj src/MockServer.Core/
COPY src/MockServer.Infrastructure/MockServer.Infrastructure.csproj src/MockServer.Infrastructure/
COPY src/MockServer.UseCases/MockServer.UseCases.csproj src/MockServer.UseCases/
COPY src/MockServer.Web/MockServer.Web.csproj src/MockServer.Web/

RUN dotnet restore src/MockServer.Web/MockServer.Web.csproj

# Copy all source and publish
COPY src/ src/
RUN dotnet publish src/MockServer.Web/MockServer.Web.csproj -c Release -o /app/publish --no-restore

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

# Install curl for Docker healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/publish .

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "MockServer.Web.dll"]
