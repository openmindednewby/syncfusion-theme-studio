# Task 01: Scaffold .NET Solution Structure

> **Parent**: [mock-server-master-plan.md](./mock-server-master-plan.md)
> **Status**: TODO
> **Agent**: `backend-dev`
> **Depends on**: None
> **Blocks**: Tasks 2-7

---

## Objective

Create the .NET solution and project scaffolding for the mock server, mirroring the Clean Architecture structure used by QuestionerService and OnlineMenuSaaS.

## Implementation

### Directory Structure

```
SyncfusionThemeStudio/
└── MockServer/
    ├── MockServer.sln
    └── src/
    │   ├── MockServer.Core/
    │   │   └── MockServer.Core.csproj
    │   ├── MockServer.UseCases/
    │   │   └── MockServer.UseCases.csproj
    │   ├── MockServer.Infrastructure/
    │   │   └── MockServer.Infrastructure.csproj
    │   └── MockServer.Web/
    │       └── MockServer.Web.csproj
    └── tests/
        └── MockServer.UnitTests/
            └── MockServer.UnitTests.csproj
```

### Project References (Clean Architecture dependency flow)

```
MockServer.Web → MockServer.UseCases → MockServer.Core
MockServer.Web → MockServer.Infrastructure → MockServer.Core
MockServer.UnitTests → MockServer.UseCases, MockServer.Infrastructure
```

### .csproj Key Dependencies

**MockServer.Core.csproj:**
- `Ardalis.Result`
- `Ardalis.Specification` (for IRepositoryBase)

**MockServer.UseCases.csproj:**
- `MediatR`
- `Ardalis.Result`
- References `MockServer.Core`

**MockServer.Infrastructure.csproj:**
- `Microsoft.EntityFrameworkCore.InMemory`
- `Ardalis.Specification.EntityFrameworkCore`
- References `MockServer.Core`

**MockServer.Web.csproj:**
- `FastEndpoints`
- `FastEndpoints.Swagger`
- `Serilog.AspNetCore`
- `MediatR`
- `Microsoft.AspNetCore.SignalR` (built-in, no extra package)
- References `MockServer.UseCases`, `MockServer.Infrastructure`

**MockServer.UnitTests.csproj:**
- `xunit`
- `xunit.runner.visualstudio`
- `Moq` or `NSubstitute`
- `Microsoft.NET.Test.Sdk`
- References `MockServer.UseCases`, `MockServer.Infrastructure`

### Target Framework
- Use `net9.0` to match existing services

### Steps

1. Create the directory structure
2. Run `dotnet new sln -n MockServer` in `MockServer/`
3. Create each project with `dotnet new classlib` / `dotnet new web` / `dotnet new xunit`
4. Add project references with `dotnet add reference`
5. Add NuGet packages
6. Add all projects to the solution
7. Verify `dotnet build` succeeds with empty projects
8. Add `GlobalUsings.cs` to each project (matching existing services pattern)

## Verification

```bash
cd SyncfusionThemeStudio/MockServer
dotnet build MockServer.sln
```

## Success Criteria

- [ ] Solution builds with zero errors and zero warnings
- [ ] All 5 projects exist with correct references
- [ ] Dependency flow follows Clean Architecture (no circular refs)
- [ ] GlobalUsings.cs present in each project
