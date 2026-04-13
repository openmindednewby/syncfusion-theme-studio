# Task 07: Write Unit Tests

> **Parent**: [mock-server-master-plan.md](./mock-server-master-plan.md)
> **Status**: TODO
> **Agent**: `backend-dev`
> **Depends on**: Tasks 03, 04
> **Blocks**: None

---

## Objective

Write xUnit unit tests for the MediatR handlers in MockServer.UseCases, following the same testing patterns used in QuestionerService and OnlineMenuSaaS unit tests.

## Test Strategy

- Test **handlers** (not endpoints — those are covered by integration/E2E)
- Mock `IRepository<T>` using NSubstitute or Moq
- Verify correct Result<T> responses for success and failure cases
- Verify pagination logic (skip, limit, total count)
- Verify search filtering

## Test Cases

### Products Handlers

```
Products/
├── CreateProductHandlerTests.cs
│   ├── Handle_ValidProduct_ReturnsSuccessWithId
│   └── Handle_EmptyTitle_ReturnsInvalid
├── UpdateProductHandlerTests.cs
│   ├── Handle_ExistingProduct_ReturnsSuccess
│   └── Handle_NonExistentProduct_ReturnsNotFound
├── DeleteProductHandlerTests.cs
│   ├── Handle_ExistingProduct_ReturnsSuccess
│   └── Handle_NonExistentProduct_ReturnsNotFound
├── GetProductHandlerTests.cs
│   ├── Handle_ExistingProduct_ReturnsProductDto
│   └── Handle_NonExistentProduct_ReturnsNotFound
├── ListProductsHandlerTests.cs
│   ├── Handle_DefaultParams_Returns30Products
│   ├── Handle_WithSkipAndLimit_ReturnsPaginatedResults
│   └── Handle_EmptyDb_ReturnsEmptyList
├── SearchProductsHandlerTests.cs
│   ├── Handle_MatchingQuery_ReturnsFilteredProducts
│   └── Handle_NoMatch_ReturnsEmptyList
├── ListCategoriesHandlerTests.cs
│   └── Handle_ReturnsDistinctCategories
└── ListByCategoryHandlerTests.cs
    ├── Handle_ExistingCategory_ReturnsProducts
    └── Handle_UnknownCategory_ReturnsEmptyList
```

### Users Handlers
```
Users/
├── CreateUserHandlerTests.cs (2 tests)
├── UpdateUserHandlerTests.cs (2 tests)
├── DeleteUserHandlerTests.cs (2 tests)
├── GetUserHandlerTests.cs (2 tests)
├── ListUsersHandlerTests.cs (3 tests)
└── SearchUsersHandlerTests.cs (2 tests)
```

### Orders Handlers
```
Orders/
├── CreateOrderHandlerTests.cs (2 tests)
├── UpdateOrderHandlerTests.cs (2 tests)
├── DeleteOrderHandlerTests.cs (2 tests)
├── GetOrderHandlerTests.cs (2 tests)
└── ListOrdersHandlerTests.cs (3 tests)
```

### Notifications Handlers
```
Notifications/
├── ListNotificationsHandlerTests.cs (2 tests)
└── UnreadCountHandlerTests.cs (1 test)
```

**Estimated total: ~35-40 tests**

## Test Pattern

```csharp
public class CreateProductHandlerTests
{
    private readonly IRepository<Product> _repository;
    private readonly CreateProductHandler _handler;

    public CreateProductHandlerTests()
    {
        _repository = Substitute.For<IRepository<Product>>();
        _handler = new CreateProductHandler(_repository);
    }

    [Fact]
    public async Task Handle_ValidProduct_ReturnsSuccessWithId()
    {
        // Arrange
        var command = new CreateProductCommand("Test Product", "Description", 29.99m, ...);
        _repository.AddAsync(Arg.Any<Product>(), Arg.Any<CancellationToken>())
            .Returns(callInfo => callInfo.Arg<Product>());

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().BeGreaterThan(0);
        await _repository.Received(1).AddAsync(Arg.Any<Product>(), Arg.Any<CancellationToken>());
    }
}
```

## Verification

```bash
cd SyncfusionThemeStudio/MockServer
dotnet test tests/MockServer.UnitTests/MockServer.UnitTests.csproj --verbosity normal
```

## Success Criteria

- [ ] All tests pass (`dotnet test` exits 0)
- [ ] At least 35 tests covering all handlers
- [ ] Each handler has at least a success and failure test
- [ ] Pagination logic validated
- [ ] Search filtering validated
- [ ] No flaky tests (deterministic mocks)
