using Microsoft.EntityFrameworkCore;
using MockServer.Infrastructure.Data;

namespace MockServer.UnitTests.Infrastructure;

public class EfRepositoryTests : IDisposable
{
  private readonly MockDbContext _context;
  private readonly EfRepository<Product> _repository;

  public EfRepositoryTests()
  {
    var options = new DbContextOptionsBuilder<MockDbContext>()
      .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
      .Options;

    _context = new MockDbContext(options);
    _repository = new EfRepository<Product>(_context);
  }

  [Fact]
  public async Task AddAsync_SavesToDatabase()
  {
    // Arrange
    var product = new Product { Title = "Test", Price = 10m, Brand = "B", Category = "C" };

    // Act
    var result = await _repository.AddAsync(product);

    // Assert
    result.Id.Should().BeGreaterThan(0);
    (await _context.Products.CountAsync()).Should().Be(1);
  }

  [Fact]
  public async Task GetByIdAsync_WhenExists_ReturnsEntity()
  {
    // Arrange
    var product = new Product { Title = "Test", Price = 10m, Brand = "B", Category = "C" };
    await _repository.AddAsync(product);

    // Act
    var result = await _repository.GetByIdAsync(product.Id);

    // Assert
    result.Should().NotBeNull();
    result!.Title.Should().Be("Test");
  }

  [Fact]
  public async Task GetByIdAsync_WhenNotExists_ReturnsNull()
  {
    // Act
    var result = await _repository.GetByIdAsync(999);

    // Assert
    result.Should().BeNull();
  }

  [Fact]
  public async Task ListAsync_WithPagination_ReturnsCorrectPage()
  {
    // Arrange
    for (var i = 0; i < 10; i++)
      await _repository.AddAsync(new Product { Title = $"Product {i}", Price = i, Brand = "B", Category = "C" });

    // Act
    var result = await _repository.ListAsync(3, 5);

    // Assert
    result.Should().HaveCount(5);
  }

  [Fact]
  public async Task CountAsync_ReturnsCorrectCount()
  {
    // Arrange
    await _repository.AddAsync(new Product { Title = "A", Price = 1m, Brand = "B", Category = "C" });
    await _repository.AddAsync(new Product { Title = "B", Price = 2m, Brand = "B", Category = "C" });

    // Act
    var count = await _repository.CountAsync();

    // Assert
    count.Should().Be(2);
  }

  [Fact]
  public async Task DeleteAsync_RemovesEntity()
  {
    // Arrange
    var product = new Product { Title = "ToDelete", Price = 10m, Brand = "B", Category = "C" };
    await _repository.AddAsync(product);

    // Act
    await _repository.DeleteAsync(product);

    // Assert
    (await _context.Products.CountAsync()).Should().Be(0);
  }

  public void Dispose()
  {
    _context.Dispose();
  }
}
