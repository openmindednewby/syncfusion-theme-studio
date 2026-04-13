namespace MockServer.Infrastructure.Data;

public static class SeedData
{
  public static async Task SeedDatabaseAsync(MockDbContext context)
  {
    if (await context.Products.AnyAsync()) return;

    context.Products.AddRange(GetProducts());
    context.Users.AddRange(GetUsers());
    context.Notifications.AddRange(GetNotifications());
    context.KanbanTasks.AddRange(GetKanbanTasks());
    context.CalendarEvents.AddRange(GetCalendarEvents());
    context.AuditEntries.AddRange(GetAuditEntries());
    context.Roles.AddRange(GetRoles());
    context.SystemSettings.Add(GetSystemSettings());
    context.ChatChannels.AddRange(GetChatChannels());
    context.GanttTasks.AddRange(GetGanttTasks());
    context.Organizations.AddRange(GetOrganizations());
    await context.SaveChangesAsync();

    // Seed orders after users and products exist
    context.Orders.AddRange(GetOrders());
    // Seed chat messages after channels exist
    context.ChatMessages.AddRange(GetChatMessages());
    await context.SaveChangesAsync();
  }

  private static List<Product> GetProducts() =>
  [
    new() { Title = "iPhone 15 Pro", Description = "Apple smartphone with A17 Pro chip", Price = 999.99m, DiscountPercentage = 5.0m, Rating = 4.8m, Stock = 45, Brand = "Apple", Category = "Electronics", Thumbnail = "https://picsum.photos/seed/iphone15/200", Images = ["https://picsum.photos/seed/iphone15a/400", "https://picsum.photos/seed/iphone15b/400"] },
    new() { Title = "Samsung Galaxy S24", Description = "Samsung flagship with Galaxy AI", Price = 899.99m, DiscountPercentage = 8.0m, Rating = 4.7m, Stock = 60, Brand = "Samsung", Category = "Electronics", Thumbnail = "https://picsum.photos/seed/galaxy24/200", Images = ["https://picsum.photos/seed/galaxy24a/400"] },
    new() { Title = "MacBook Pro 16\"", Description = "Apple laptop with M3 Max chip", Price = 2499.99m, DiscountPercentage = 3.0m, Rating = 4.9m, Stock = 20, Brand = "Apple", Category = "Electronics", Thumbnail = "https://picsum.photos/seed/macbook16/200", Images = ["https://picsum.photos/seed/macbook16a/400"] },
    new() { Title = "Sony WH-1000XM5", Description = "Premium noise-cancelling headphones", Price = 349.99m, DiscountPercentage = 12.0m, Rating = 4.6m, Stock = 80, Brand = "Sony", Category = "Electronics", Thumbnail = "https://picsum.photos/seed/sonyxm5/200", Images = ["https://picsum.photos/seed/sonyxm5a/400"] },
    new() { Title = "Dell XPS 15", Description = "Premium ultrabook with OLED display", Price = 1799.99m, DiscountPercentage = 7.0m, Rating = 4.5m, Stock = 35, Brand = "Dell", Category = "Electronics", Thumbnail = "https://picsum.photos/seed/dellxps/200", Images = ["https://picsum.photos/seed/dellxpsa/400"] },
    new() { Title = "Nike Air Max 270", Description = "Comfortable running shoes with Air cushioning", Price = 150.00m, DiscountPercentage = 15.0m, Rating = 4.4m, Stock = 120, Brand = "Nike", Category = "Clothing", Thumbnail = "https://picsum.photos/seed/airmax/200", Images = ["https://picsum.photos/seed/airmaxa/400"] },
    new() { Title = "Levi's 501 Original", Description = "Classic straight-fit jeans", Price = 69.50m, DiscountPercentage = 20.0m, Rating = 4.3m, Stock = 200, Brand = "Levi's", Category = "Clothing", Thumbnail = "https://picsum.photos/seed/levis501/200", Images = ["https://picsum.photos/seed/levis501a/400"] },
    new() { Title = "Adidas Ultraboost 23", Description = "High-performance running shoes", Price = 190.00m, DiscountPercentage = 10.0m, Rating = 4.6m, Stock = 90, Brand = "Adidas", Category = "Clothing", Thumbnail = "https://picsum.photos/seed/ultraboost/200", Images = ["https://picsum.photos/seed/ultraboosta/400"] },
    new() { Title = "North Face Thermoball Jacket", Description = "Lightweight insulated jacket", Price = 229.00m, DiscountPercentage = 18.0m, Rating = 4.5m, Stock = 55, Brand = "The North Face", Category = "Clothing", Thumbnail = "https://picsum.photos/seed/thermoball/200", Images = ["https://picsum.photos/seed/thermoballa/400"] },
    new() { Title = "Patagonia Better Sweater", Description = "Fleece jacket made from recycled materials", Price = 139.00m, DiscountPercentage = 5.0m, Rating = 4.7m, Stock = 70, Brand = "Patagonia", Category = "Clothing", Thumbnail = "https://picsum.photos/seed/patagonia/200", Images = ["https://picsum.photos/seed/patagoniaa/400"] },
    new() { Title = "Dyson V15 Detect", Description = "Cordless vacuum with laser dust detection", Price = 749.99m, DiscountPercentage = 6.0m, Rating = 4.8m, Stock = 30, Brand = "Dyson", Category = "Home", Thumbnail = "https://picsum.photos/seed/dysonv15/200", Images = ["https://picsum.photos/seed/dysonv15a/400"] },
    new() { Title = "KitchenAid Stand Mixer", Description = "Professional 5-quart stand mixer", Price = 449.99m, DiscountPercentage = 10.0m, Rating = 4.9m, Stock = 25, Brand = "KitchenAid", Category = "Home", Thumbnail = "https://picsum.photos/seed/kitchenaid/200", Images = ["https://picsum.photos/seed/kitchenaida/400"] },
    new() { Title = "Instant Pot Duo 7-in-1", Description = "Multi-use electric pressure cooker", Price = 89.95m, DiscountPercentage = 25.0m, Rating = 4.7m, Stock = 150, Brand = "Instant Pot", Category = "Home", Thumbnail = "https://picsum.photos/seed/instantpot/200", Images = ["https://picsum.photos/seed/instantpota/400"] },
    new() { Title = "Roomba j7+", Description = "Robot vacuum with obstacle avoidance", Price = 599.99m, DiscountPercentage = 15.0m, Rating = 4.4m, Stock = 40, Brand = "iRobot", Category = "Home", Thumbnail = "https://picsum.photos/seed/roomba/200", Images = ["https://picsum.photos/seed/roombaa/400"] },
    new() { Title = "Breville Barista Express", Description = "Espresso machine with built-in grinder", Price = 699.95m, DiscountPercentage = 8.0m, Rating = 4.6m, Stock = 18, Brand = "Breville", Category = "Home", Thumbnail = "https://picsum.photos/seed/breville/200", Images = ["https://picsum.photos/seed/brevillea/400"] },
    new() { Title = "Organic Almond Butter", Description = "Smooth organic almond butter, 16oz", Price = 12.99m, DiscountPercentage = 5.0m, Rating = 4.5m, Stock = 300, Brand = "Justin's", Category = "Food", Thumbnail = "https://picsum.photos/seed/almondbutter/200", Images = ["https://picsum.photos/seed/almondbuttera/400"] },
    new() { Title = "Matcha Green Tea Powder", Description = "Ceremonial grade matcha from Japan", Price = 29.99m, DiscountPercentage = 10.0m, Rating = 4.8m, Stock = 180, Brand = "Jade Leaf", Category = "Food", Thumbnail = "https://picsum.photos/seed/matcha/200", Images = ["https://picsum.photos/seed/matchaa/400"] },
    new() { Title = "Dark Chocolate Truffles", Description = "Belgian dark chocolate truffle collection", Price = 24.99m, DiscountPercentage = 12.0m, Rating = 4.7m, Stock = 100, Brand = "Godiva", Category = "Food", Thumbnail = "https://picsum.photos/seed/truffles/200", Images = ["https://picsum.photos/seed/trufflesa/400"] },
    new() { Title = "Extra Virgin Olive Oil", Description = "Cold-pressed Italian olive oil, 500ml", Price = 18.50m, DiscountPercentage = 8.0m, Rating = 4.6m, Stock = 220, Brand = "Colavita", Category = "Food", Thumbnail = "https://picsum.photos/seed/oliveoil/200", Images = ["https://picsum.photos/seed/oliveoila/400"] },
    new() { Title = "Organic Coffee Beans", Description = "Single origin Ethiopian coffee, 1lb", Price = 16.99m, DiscountPercentage = 15.0m, Rating = 4.9m, Stock = 250, Brand = "Counter Culture", Category = "Food", Thumbnail = "https://picsum.photos/seed/coffeebeans/200", Images = ["https://picsum.photos/seed/coffeebansa/400"] },
    new() { Title = "Yoga Mat Premium", Description = "Non-slip exercise mat, 6mm thick", Price = 68.00m, DiscountPercentage = 10.0m, Rating = 4.5m, Stock = 140, Brand = "Manduka", Category = "Sports", Thumbnail = "https://picsum.photos/seed/yogamat/200", Images = ["https://picsum.photos/seed/yogamata/400"] },
    new() { Title = "Adjustable Dumbbells", Description = "5-52.5 lb adjustable dumbbell set", Price = 349.00m, DiscountPercentage = 5.0m, Rating = 4.7m, Stock = 35, Brand = "Bowflex", Category = "Sports", Thumbnail = "https://picsum.photos/seed/dumbbells/200", Images = ["https://picsum.photos/seed/dumbbellsa/400"] },
    new() { Title = "Running Watch GPS", Description = "GPS running watch with heart rate monitor", Price = 299.99m, DiscountPercentage = 12.0m, Rating = 4.6m, Stock = 50, Brand = "Garmin", Category = "Sports", Thumbnail = "https://picsum.photos/seed/garminwatch/200", Images = ["https://picsum.photos/seed/garminwatcha/400"] },
    new() { Title = "Resistance Bands Set", Description = "Set of 5 resistance bands with handles", Price = 29.99m, DiscountPercentage = 20.0m, Rating = 4.4m, Stock = 200, Brand = "Fit Simplify", Category = "Sports", Thumbnail = "https://picsum.photos/seed/resistbands/200", Images = ["https://picsum.photos/seed/resistbandsa/400"] },
    new() { Title = "Foam Roller", Description = "High-density foam roller for recovery", Price = 24.95m, DiscountPercentage = 8.0m, Rating = 4.3m, Stock = 175, Brand = "TriggerPoint", Category = "Sports", Thumbnail = "https://picsum.photos/seed/foamroller/200", Images = ["https://picsum.photos/seed/foamrollera/400"] },
    new() { Title = "iPad Air M2", Description = "Apple tablet with M2 chip and 11-inch display", Price = 599.00m, DiscountPercentage = 4.0m, Rating = 4.8m, Stock = 55, Brand = "Apple", Category = "Electronics", Thumbnail = "https://picsum.photos/seed/ipadair/200", Images = ["https://picsum.photos/seed/ipadaira/400"] },
    new() { Title = "Canon EOS R6 Mark II", Description = "Full-frame mirrorless camera", Price = 2499.00m, DiscountPercentage = 3.0m, Rating = 4.9m, Stock = 12, Brand = "Canon", Category = "Electronics", Thumbnail = "https://picsum.photos/seed/canonr6/200", Images = ["https://picsum.photos/seed/canonr6a/400"] },
    new() { Title = "Herman Miller Aeron Chair", Description = "Ergonomic office chair, size B", Price = 1395.00m, DiscountPercentage = 0.0m, Rating = 4.8m, Stock = 15, Brand = "Herman Miller", Category = "Home", Thumbnail = "https://picsum.photos/seed/aeron/200", Images = ["https://picsum.photos/seed/aerona/400"] },
    new() { Title = "Wilson Pro Staff Tennis Racket", Description = "Professional tennis racket, 97 sq in", Price = 249.00m, DiscountPercentage = 10.0m, Rating = 4.5m, Stock = 40, Brand = "Wilson", Category = "Sports", Thumbnail = "https://picsum.photos/seed/wilson/200", Images = ["https://picsum.photos/seed/wilsona/400"] },
    new() { Title = "Samsonite Carry-On Spinner", Description = "Hardside expandable carry-on luggage", Price = 179.99m, DiscountPercentage = 22.0m, Rating = 4.4m, Stock = 65, Brand = "Samsonite", Category = "Clothing", Thumbnail = "https://picsum.photos/seed/samsonite/200", Images = ["https://picsum.photos/seed/samsonitea/400"] },
  ];

  private static List<User> GetUsers() =>
  [
    // Demo users for RBAC - each role has a dedicated login
    new() { FirstName = "Demo", LastName = "Admin", Email = "demo@example.com", Phone = "+1-555-0100", Username = "demo", PasswordHash = "demo123", Role = "Admin", BirthDate = new DateTime(1990, 1, 1), Image = "https://picsum.photos/seed/demo/100", Address = new Address { Street = "1 Demo Street", City = "San Francisco", State = "CA", PostalCode = "94102", Country = "USA" } },
    new() { FirstName = "Admin", LastName = "User", Email = "admin@example.com", Phone = "+1-555-0090", Username = "admin", PasswordHash = "admin123", Role = "Admin", BirthDate = new DateTime(1985, 6, 15), Image = "https://picsum.photos/seed/admin/100", Address = new Address { Street = "10 Admin Blvd", City = "San Francisco", State = "CA", PostalCode = "94103", Country = "USA" } },
    new() { FirstName = "Manager", LastName = "User", Email = "manager@example.com", Phone = "+1-555-0091", Username = "manager", PasswordHash = "manager123", Role = "Manager", BirthDate = new DateTime(1988, 4, 20), Image = "https://picsum.photos/seed/manager/100", Address = new Address { Street = "20 Manager Ave", City = "New York", State = "NY", PostalCode = "10001", Country = "USA" } },
    new() { FirstName = "Viewer", LastName = "User", Email = "viewer@example.com", Phone = "+1-555-0092", Username = "viewer", PasswordHash = "viewer123", Role = "Viewer", BirthDate = new DateTime(1995, 8, 10), Image = "https://picsum.photos/seed/viewer/100", Address = new Address { Street = "30 Viewer Ln", City = "Chicago", State = "IL", PostalCode = "60601", Country = "USA" } },
    // Regular users
    new() { FirstName = "James", LastName = "Wilson", Email = "james.wilson@example.com", Phone = "+1-555-0101", Username = "jwilson", PasswordHash = "password123", Role = "Admin", BirthDate = new DateTime(1988, 3, 15), Image = "https://picsum.photos/seed/user1/100", Address = new Address { Street = "123 Oak Avenue", City = "San Francisco", State = "CA", PostalCode = "94102", Country = "USA" } },
    new() { FirstName = "Sarah", LastName = "Chen", Email = "sarah.chen@example.com", Phone = "+1-555-0102", Username = "schen", PasswordHash = "password123", Role = "Manager", BirthDate = new DateTime(1992, 7, 22), Image = "https://picsum.photos/seed/user2/100", Address = new Address { Street = "456 Maple Street", City = "New York", State = "NY", PostalCode = "10001", Country = "USA" } },
    new() { FirstName = "Michael", LastName = "Brown", Email = "michael.brown@example.com", Phone = "+1-555-0103", Username = "mbrown", PasswordHash = "password123", Role = "Manager", BirthDate = new DateTime(1985, 11, 8), Image = "https://picsum.photos/seed/user3/100", Address = new Address { Street = "789 Pine Road", City = "Chicago", State = "IL", PostalCode = "60601", Country = "USA" } },
    new() { FirstName = "Emma", LastName = "Davis", Email = "emma.davis@example.com", Phone = "+1-555-0104", Username = "edavis", PasswordHash = "password123", Role = "Viewer", BirthDate = new DateTime(1995, 1, 30), Image = "https://picsum.photos/seed/user4/100", Address = new Address { Street = "321 Elm Drive", City = "Austin", State = "TX", PostalCode = "73301", Country = "USA" } },
    new() { FirstName = "Daniel", LastName = "Martinez", Email = "daniel.martinez@example.com", Phone = "+1-555-0105", Username = "dmartinez", PasswordHash = "password123", Role = "Analyst", BirthDate = new DateTime(1990, 5, 17), Image = "https://picsum.photos/seed/user5/100", Address = new Address { Street = "654 Cedar Lane", City = "Seattle", State = "WA", PostalCode = "98101", Country = "USA" } },
    new() { FirstName = "Olivia", LastName = "Taylor", Email = "olivia.taylor@example.com", Phone = "+1-555-0106", Username = "otaylor", PasswordHash = "password123", Role = "Viewer", BirthDate = new DateTime(1993, 9, 3), Image = "https://picsum.photos/seed/user6/100", Address = new Address { Street = "987 Birch Court", City = "Denver", State = "CO", PostalCode = "80201", Country = "USA" } },
    new() { FirstName = "William", LastName = "Anderson", Email = "william.anderson@example.com", Phone = "+1-555-0107", Username = "wanderson", PasswordHash = "password123", Role = "Viewer", BirthDate = new DateTime(1987, 12, 25), Image = "https://picsum.photos/seed/user7/100", Address = new Address { Street = "147 Walnut Way", City = "Portland", State = "OR", PostalCode = "97201", Country = "USA" } },
    new() { FirstName = "Sophia", LastName = "Thomas", Email = "sophia.thomas@example.com", Phone = "+1-555-0108", Username = "sthomas", PasswordHash = "password123", Role = "Viewer", BirthDate = new DateTime(1991, 4, 11), Image = "https://picsum.photos/seed/user8/100", Address = new Address { Street = "258 Spruce Place", City = "Miami", State = "FL", PostalCode = "33101", Country = "USA" } },
    new() { FirstName = "Alexander", LastName = "Jackson", Email = "alex.jackson@example.com", Phone = "+1-555-0109", Username = "ajackson", PasswordHash = "password123", Role = "Viewer", BirthDate = new DateTime(1989, 8, 19), Image = "https://picsum.photos/seed/user9/100", Address = new Address { Street = "369 Ash Boulevard", City = "Boston", State = "MA", PostalCode = "02101", Country = "USA" } },
    new() { FirstName = "Isabella", LastName = "White", Email = "isabella.white@example.com", Phone = "+1-555-0110", Username = "iwhite", PasswordHash = "password123", Role = "Viewer", BirthDate = new DateTime(1994, 2, 7), Image = "https://picsum.photos/seed/user10/100", Address = new Address { Street = "480 Poplar Circle", City = "Nashville", State = "TN", PostalCode = "37201", Country = "USA" } },
    new() { FirstName = "Ethan", LastName = "Harris", Email = "ethan.harris@example.com", Phone = "+1-555-0111", Username = "eharris", PasswordHash = "password123", Role = "Viewer", BirthDate = new DateTime(1986, 6, 14), Image = "https://picsum.photos/seed/user11/100", Address = new Address { Street = "591 Willow Street", City = "Philadelphia", State = "PA", PostalCode = "19101", Country = "USA" } },
    new() { FirstName = "Mia", LastName = "Clark", Email = "mia.clark@example.com", Phone = "+1-555-0112", Username = "mclark", PasswordHash = "password123", Role = "Viewer", BirthDate = new DateTime(1996, 10, 28), Image = "https://picsum.photos/seed/user12/100", Address = new Address { Street = "602 Cypress Avenue", City = "San Diego", State = "CA", PostalCode = "92101", Country = "USA" } },
    new() { FirstName = "Benjamin", LastName = "Lewis", Email = "ben.lewis@example.com", Phone = "+1-555-0113", Username = "blewis", PasswordHash = "password123", Role = "Viewer", BirthDate = new DateTime(1984, 3, 5), Image = "https://picsum.photos/seed/user13/100", Address = new Address { Street = "713 Redwood Drive", City = "Atlanta", State = "GA", PostalCode = "30301", Country = "USA" } },
    new() { FirstName = "Charlotte", LastName = "Robinson", Email = "charlotte.robinson@example.com", Phone = "+1-555-0114", Username = "crobinson", PasswordHash = "password123", Role = "Viewer", BirthDate = new DateTime(1997, 7, 12), Image = "https://picsum.photos/seed/user14/100", Address = new Address { Street = "824 Magnolia Lane", City = "Phoenix", State = "AZ", PostalCode = "85001", Country = "USA" } },
    new() { FirstName = "Lucas", LastName = "Walker", Email = "lucas.walker@example.com", Phone = "+1-555-0115", Username = "lwalker", PasswordHash = "password123", Role = "Viewer", BirthDate = new DateTime(1983, 11, 21), Image = "https://picsum.photos/seed/user15/100", Address = new Address { Street = "935 Chestnut Road", City = "Minneapolis", State = "MN", PostalCode = "55401", Country = "USA" } },
    new() { FirstName = "Amelia", LastName = "Hall", Email = "amelia.hall@example.com", Phone = "+1-555-0116", Username = "ahall", PasswordHash = "password123", Role = "Viewer", BirthDate = new DateTime(1998, 1, 9), Image = "https://picsum.photos/seed/user16/100", Address = new Address { Street = "146 Sycamore Way", City = "Detroit", State = "MI", PostalCode = "48201", Country = "USA" } },
    new() { FirstName = "Henry", LastName = "Young", Email = "henry.young@example.com", Phone = "+1-555-0117", Username = "hyoung", PasswordHash = "password123", Role = "Viewer", BirthDate = new DateTime(1990, 9, 16), Image = "https://picsum.photos/seed/user17/100", Address = new Address { Street = "257 Juniper Court", City = "Dallas", State = "TX", PostalCode = "75201", Country = "USA" } },
    new() { FirstName = "Ava", LastName = "King", Email = "ava.king@example.com", Phone = "+1-555-0118", Username = "aking", PasswordHash = "password123", Role = "Viewer", BirthDate = new DateTime(1992, 5, 24), Image = "https://picsum.photos/seed/user18/100", Address = new Address { Street = "368 Hickory Place", City = "Tampa", State = "FL", PostalCode = "33601", Country = "USA" } },
    new() { FirstName = "Sebastian", LastName = "Wright", Email = "sebastian.wright@example.com", Phone = "+1-555-0119", Username = "swright", PasswordHash = "password123", Role = "Viewer", BirthDate = new DateTime(1988, 12, 2), Image = "https://picsum.photos/seed/user19/100", Address = new Address { Street = "479 Dogwood Boulevard", City = "Charlotte", State = "NC", PostalCode = "28201", Country = "USA" } },
    new() { FirstName = "Harper", LastName = "Lopez", Email = "harper.lopez@example.com", Phone = "+1-555-0120", Username = "hlopez", PasswordHash = "password123", Role = "Viewer", BirthDate = new DateTime(1994, 8, 31), Image = "https://picsum.photos/seed/user20/100", Address = new Address { Street = "580 Hawthorn Circle", City = "Las Vegas", State = "NV", PostalCode = "89101", Country = "USA" } },
  ];

  private static List<Order> GetOrders() =>
  [
    new() { UserId = 1, Status = OrderStatus.Delivered, TotalAmount = 1349.98m, Items = [new() { ProductId = 1, ProductTitle = "iPhone 15 Pro", Quantity = 1, UnitPrice = 999.99m }, new() { ProductId = 4, ProductTitle = "Sony WH-1000XM5", Quantity = 1, UnitPrice = 349.99m }] },
    new() { UserId = 2, Status = OrderStatus.Processing, TotalAmount = 190.00m, Items = [new() { ProductId = 8, ProductTitle = "Adidas Ultraboost 23", Quantity = 1, UnitPrice = 190.00m }] },
    new() { UserId = 3, Status = OrderStatus.Shipped, TotalAmount = 539.94m, Items = [new() { ProductId = 12, ProductTitle = "KitchenAid Stand Mixer", Quantity = 1, UnitPrice = 449.99m }, new() { ProductId = 13, ProductTitle = "Instant Pot Duo 7-in-1", Quantity = 1, UnitPrice = 89.95m }] },
    new() { UserId = 4, Status = OrderStatus.Pending, TotalAmount = 2499.99m, Items = [new() { ProductId = 3, ProductTitle = "MacBook Pro 16\"", Quantity = 1, UnitPrice = 2499.99m }] },
    new() { UserId = 5, Status = OrderStatus.Delivered, TotalAmount = 97.97m, Items = [new() { ProductId = 16, ProductTitle = "Organic Almond Butter", Quantity = 2, UnitPrice = 12.99m }, new() { ProductId = 17, ProductTitle = "Matcha Green Tea Powder", Quantity = 1, UnitPrice = 29.99m }, new() { ProductId = 20, ProductTitle = "Organic Coffee Beans", Quantity = 2, UnitPrice = 16.99m }, new() { ProductId = 19, ProductTitle = "Extra Virgin Olive Oil", Quantity = 1, UnitPrice = 18.50m }] },
    new() { UserId = 6, Status = OrderStatus.Cancelled, TotalAmount = 349.00m, Items = [new() { ProductId = 22, ProductTitle = "Adjustable Dumbbells", Quantity = 1, UnitPrice = 349.00m }] },
    new() { UserId = 7, Status = OrderStatus.Delivered, TotalAmount = 1799.99m, Items = [new() { ProductId = 5, ProductTitle = "Dell XPS 15", Quantity = 1, UnitPrice = 1799.99m }] },
    new() { UserId = 8, Status = OrderStatus.Processing, TotalAmount = 368.00m, Items = [new() { ProductId = 9, ProductTitle = "North Face Thermoball Jacket", Quantity = 1, UnitPrice = 229.00m }, new() { ProductId = 10, ProductTitle = "Patagonia Better Sweater", Quantity = 1, UnitPrice = 139.00m }] },
    new() { UserId = 9, Status = OrderStatus.Shipped, TotalAmount = 749.99m, Items = [new() { ProductId = 11, ProductTitle = "Dyson V15 Detect", Quantity = 1, UnitPrice = 749.99m }] },
    new() { UserId = 10, Status = OrderStatus.Pending, TotalAmount = 599.00m, Items = [new() { ProductId = 26, ProductTitle = "iPad Air M2", Quantity = 1, UnitPrice = 599.00m }] },
    new() { UserId = 1, Status = OrderStatus.Delivered, TotalAmount = 299.99m, Items = [new() { ProductId = 23, ProductTitle = "Running Watch GPS", Quantity = 1, UnitPrice = 299.99m }] },
    new() { UserId = 3, Status = OrderStatus.Processing, TotalAmount = 899.99m, Items = [new() { ProductId = 2, ProductTitle = "Samsung Galaxy S24", Quantity = 1, UnitPrice = 899.99m }] },
    new() { UserId = 5, Status = OrderStatus.Shipped, TotalAmount = 699.95m, Items = [new() { ProductId = 15, ProductTitle = "Breville Barista Express", Quantity = 1, UnitPrice = 699.95m }] },
    new() { UserId = 12, Status = OrderStatus.Pending, TotalAmount = 319.50m, Items = [new() { ProductId = 6, ProductTitle = "Nike Air Max 270", Quantity = 1, UnitPrice = 150.00m }, new() { ProductId = 7, ProductTitle = "Levi's 501 Original", Quantity = 1, UnitPrice = 69.50m }, new() { ProductId = 25, ProductTitle = "Foam Roller", Quantity = 4, UnitPrice = 24.95m }] },
    new() { UserId = 15, Status = OrderStatus.Delivered, TotalAmount = 2499.00m, Items = [new() { ProductId = 27, ProductTitle = "Canon EOS R6 Mark II", Quantity = 1, UnitPrice = 2499.00m }] },
  ];

  private static List<Notification> GetNotifications() =>
  [
    new() { Type = NotificationType.Success, Title = "Order Delivered", Message = "Order #1001 has been delivered successfully.", IsRead = true },
    new() { Type = NotificationType.Info, Title = "New Feature Available", Message = "Dark mode is now available in settings.", IsRead = true },
    new() { Type = NotificationType.Warning, Title = "Low Stock Alert", Message = "Canon EOS R6 Mark II stock is below 15 units.", IsRead = false },
    new() { Type = NotificationType.Error, Title = "Payment Failed", Message = "Payment processing failed for order #1006.", IsRead = false },
    new() { Type = NotificationType.Info, Title = "System Maintenance", Message = "Scheduled maintenance on Feb 15, 2026 from 2-4 AM UTC.", IsRead = false },
    new() { Type = NotificationType.Success, Title = "New User Registered", Message = "User harper.lopez@example.com has joined the platform.", IsRead = true },
    new() { Type = NotificationType.Warning, Title = "High Traffic", Message = "Server load is above 80% capacity.", IsRead = false },
    new() { Type = NotificationType.Info, Title = "Weekly Report Ready", Message = "Your weekly sales report is ready for download.", IsRead = true },
    new() { Type = NotificationType.Success, Title = "Backup Complete", Message = "Database backup completed successfully.", IsRead = true },
    new() { Type = NotificationType.Error, Title = "API Rate Limit", Message = "Third-party API rate limit exceeded.", IsRead = false },
    new() { Type = NotificationType.Info, Title = "Price Update", Message = "5 products have been updated with new pricing.", IsRead = false },
    new() { Type = NotificationType.Warning, Title = "Expiring Subscription", Message = "Your premium subscription expires in 7 days.", IsRead = false },
    new() { Type = NotificationType.Success, Title = "Order Shipped", Message = "Order #1009 has been shipped via FedEx.", IsRead = true },
    new() { Type = NotificationType.Info, Title = "New Review Posted", Message = "A new 5-star review was posted for iPhone 15 Pro.", IsRead = false },
    new() { Type = NotificationType.Warning, Title = "Security Alert", Message = "Multiple failed login attempts detected.", IsRead = false },
    new() { Type = NotificationType.Success, Title = "Campaign Launched", Message = "Spring sale campaign is now live.", IsRead = true },
    new() { Type = NotificationType.Error, Title = "Webhook Failed", Message = "Webhook delivery to endpoint failed after 3 retries.", IsRead = false },
    new() { Type = NotificationType.Info, Title = "Inventory Restocked", Message = "50 units of Adjustable Dumbbells have been restocked.", IsRead = true },
    new() { Type = NotificationType.Success, Title = "User Verified", Message = "Email verification completed for daniel.martinez.", IsRead = true },
    new() { Type = NotificationType.Warning, Title = "Disk Space Low", Message = "Server disk usage is at 85%.", IsRead = false },
    new() { Type = NotificationType.Info, Title = "API Version Update", Message = "API v2.1 is now available with improved endpoints.", IsRead = false },
    new() { Type = NotificationType.Success, Title = "Export Complete", Message = "Product catalog export completed (CSV).", IsRead = true },
    new() { Type = NotificationType.Error, Title = "Email Delivery Failed", Message = "Failed to send order confirmation to customer.", IsRead = false },
    new() { Type = NotificationType.Info, Title = "New Integration", Message = "Stripe payment integration is now available.", IsRead = false },
    new() { Type = NotificationType.Warning, Title = "Slow Query Detected", Message = "Database query taking >5s on products endpoint.", IsRead = false },
  ];

  private static List<KanbanTask> GetKanbanTasks() =>
  [
    // Backlog (6 tasks)
    new() { Title = "Set up CI/CD pipeline", Summary = "Configure GitHub Actions for automated builds and deployments", Status = "Backlog", Priority = "High", Assignee = "Sarah Chen", Tags = "DevOps,Infrastructure", Color = "#1e88e5", DueDate = new DateTime(2026, 3, 20) },
    new() { Title = "Design system tokens", Summary = "Create a comprehensive design token system for colors, spacing, and typography", Status = "Backlog", Priority = "Normal", Assignee = "Emma Davis", Tags = "Design,Frontend", Color = "#43a047", DueDate = new DateTime(2026, 3, 25) },
    new() { Title = "API rate limiting", Summary = "Implement rate limiting middleware for all public API endpoints", Status = "Backlog", Priority = "High", Assignee = "Michael Brown", Tags = "Backend,Security", Color = "#e53935", DueDate = new DateTime(2026, 3, 18) },
    new() { Title = "Mobile responsive audit", Summary = "Audit all pages for mobile responsiveness and fix breakpoint issues", Status = "Backlog", Priority = "Low", Assignee = "Daniel Martinez", Tags = "Frontend,QA", Color = "#fb8c00", DueDate = new DateTime(2026, 4, 1) },
    new() { Title = "Database indexing", Summary = "Analyze slow queries and add appropriate database indexes", Status = "Backlog", Priority = "Critical", Assignee = "Sarah Chen", Tags = "Backend,Performance", Color = "#e53935", DueDate = new DateTime(2026, 3, 15) },
    new() { Title = "Accessibility WCAG audit", Summary = "Perform a full WCAG 2.1 AA compliance audit on all user-facing pages", Status = "Backlog", Priority = "Normal", Assignee = "Olivia Taylor", Tags = "Frontend,Accessibility", Color = "#8e24aa", DueDate = new DateTime(2026, 4, 5) },

    // InProgress (5 tasks)
    new() { Title = "User authentication flow", Summary = "Implement OAuth 2.0 login with Google and Microsoft providers", Status = "InProgress", Priority = "Critical", Assignee = "Michael Brown", Tags = "Backend,Auth", Color = "#e53935", DueDate = new DateTime(2026, 3, 12) },
    new() { Title = "Dashboard charts", Summary = "Build interactive revenue and user growth charts with Syncfusion", Status = "InProgress", Priority = "High", Assignee = "Emma Davis", Tags = "Frontend,Charts", Color = "#1e88e5", DueDate = new DateTime(2026, 3, 14) },
    new() { Title = "Email notification service", Summary = "Create email service with templates for order confirmations and alerts", Status = "InProgress", Priority = "Normal", Assignee = "Sarah Chen", Tags = "Backend,Notifications", Color = "#43a047", DueDate = new DateTime(2026, 3, 16) },
    new() { Title = "Product search", Summary = "Implement full-text search with filters for the product catalog", Status = "InProgress", Priority = "High", Assignee = "Daniel Martinez", Tags = "Frontend,Backend", Color = "#1e88e5", DueDate = new DateTime(2026, 3, 13) },
    new() { Title = "Dark mode refinements", Summary = "Fix contrast issues and missing theme tokens in dark mode", Status = "InProgress", Priority = "Low", Assignee = "Olivia Taylor", Tags = "Frontend,Design", Color = "#fb8c00", DueDate = new DateTime(2026, 3, 20) },

    // Review (5 tasks)
    new() { Title = "Order management API", Summary = "Complete CRUD endpoints for order lifecycle management", Status = "Review", Priority = "High", Assignee = "Michael Brown", Tags = "Backend,API", Color = "#1e88e5", DueDate = new DateTime(2026, 3, 10) },
    new() { Title = "Form validation library", Summary = "Create reusable form validation hooks with Zod schema support", Status = "Review", Priority = "Normal", Assignee = "Daniel Martinez", Tags = "Frontend,Forms", Color = "#43a047", DueDate = new DateTime(2026, 3, 11) },
    new() { Title = "User profile page", Summary = "Build user profile page with avatar upload and settings management", Status = "Review", Priority = "Normal", Assignee = "Emma Davis", Tags = "Frontend,UI", Color = "#43a047", DueDate = new DateTime(2026, 3, 9) },
    new() { Title = "Logging infrastructure", Summary = "Set up structured logging with Serilog and centralized log aggregation", Status = "Review", Priority = "Low", Assignee = "Sarah Chen", Tags = "Backend,DevOps", Color = "#fb8c00", DueDate = new DateTime(2026, 3, 8) },
    new() { Title = "Unit test coverage", Summary = "Increase unit test coverage to 80% for all core business logic", Status = "Review", Priority = "Critical", Assignee = "Olivia Taylor", Tags = "Testing,QA", Color = "#e53935", DueDate = new DateTime(2026, 3, 7) },

    // Done (6 tasks)
    new() { Title = "Project scaffolding", Summary = "Initialize monorepo with React frontend and .NET backend", Status = "Done", Priority = "Critical", Assignee = "Sarah Chen", Tags = "DevOps,Setup", Color = "#43a047", DueDate = new DateTime(2026, 2, 28) },
    new() { Title = "Database schema design", Summary = "Design and implement the core database schema with EF Core migrations", Status = "Done", Priority = "High", Assignee = "Michael Brown", Tags = "Backend,Database", Color = "#1e88e5", DueDate = new DateTime(2026, 3, 1) },
    new() { Title = "Component library setup", Summary = "Configure Syncfusion component library with theme integration", Status = "Done", Priority = "High", Assignee = "Emma Davis", Tags = "Frontend,Setup", Color = "#1e88e5", DueDate = new DateTime(2026, 3, 2) },
    new() { Title = "Environment configuration", Summary = "Set up development, staging, and production environment configs", Status = "Done", Priority = "Normal", Assignee = "Daniel Martinez", Tags = "DevOps,Config", Color = "#43a047", DueDate = new DateTime(2026, 2, 25) },
    new() { Title = "Landing page", Summary = "Design and build the marketing landing page with hero section", Status = "Done", Priority = "Low", Assignee = "Olivia Taylor", Tags = "Frontend,Marketing", Color = "#fb8c00", DueDate = new DateTime(2026, 2, 20) },
    new() { Title = "API documentation", Summary = "Generate OpenAPI/Swagger docs for all REST endpoints", Status = "Done", Priority = "Normal", Assignee = "Michael Brown", Tags = "Backend,Docs", Color = "#43a047", DueDate = new DateTime(2026, 3, 3) },
  ];

  private static List<CalendarEvent> GetCalendarEvents()
  {
    var now = DateTime.UtcNow;
    var monthStart = new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc);

    return
    [
      // Meetings
      new() { Title = "Sprint Planning", Description = "Bi-weekly sprint planning session", StartTime = monthStart.AddDays(0).AddHours(9), EndTime = monthStart.AddDays(0).AddHours(10).AddMinutes(30), Location = "Conference Room A", IsAllDay = false, Category = "Meeting", Color = "#1e88e5", CreatedBy = "James Wilson" },
      new() { Title = "Design Review", Description = "Review new dashboard mockups with the design team", StartTime = monthStart.AddDays(1).AddHours(14), EndTime = monthStart.AddDays(1).AddHours(15), Location = "Conference Room B", IsAllDay = false, Category = "Meeting", Color = "#1e88e5", CreatedBy = "Emma Davis" },
      new() { Title = "Client Demo", Description = "Product demo for Acme Corp stakeholders", StartTime = monthStart.AddDays(3).AddHours(10), EndTime = monthStart.AddDays(3).AddHours(11).AddMinutes(30), Location = "Virtual - Zoom", IsAllDay = false, Category = "Meeting", Color = "#1e88e5", CreatedBy = "Sarah Chen" },
      new() { Title = "Architecture Review", Description = "Review microservices migration plan", StartTime = monthStart.AddDays(5).AddHours(13), EndTime = monthStart.AddDays(5).AddHours(14).AddMinutes(30), Location = "Conference Room A", IsAllDay = false, Category = "Meeting", Color = "#1e88e5", CreatedBy = "Michael Brown" },
      new() { Title = "Stakeholder Sync", Description = "Monthly sync with product stakeholders", StartTime = monthStart.AddDays(7).AddHours(11), EndTime = monthStart.AddDays(7).AddHours(12), Location = "Board Room", IsAllDay = false, Category = "Meeting", Color = "#1e88e5", CreatedBy = "James Wilson" },
      new() { Title = "Team Retrospective", Description = "End-of-sprint retrospective", StartTime = monthStart.AddDays(10).AddHours(15), EndTime = monthStart.AddDays(10).AddHours(16), Location = "Conference Room C", IsAllDay = false, Category = "Meeting", Color = "#1e88e5", CreatedBy = "Daniel Martinez" },
      new() { Title = "Budget Planning", Description = "Q2 budget planning with finance", StartTime = monthStart.AddDays(12).AddHours(9).AddMinutes(30), EndTime = monthStart.AddDays(12).AddHours(11), Location = "Board Room", IsAllDay = false, Category = "Meeting", Color = "#1e88e5", CreatedBy = "Sarah Chen" },
      new() { Title = "Vendor Meeting", Description = "Quarterly review with cloud vendor", StartTime = monthStart.AddDays(14).AddHours(14), EndTime = monthStart.AddDays(14).AddHours(15), Location = "Virtual - Teams", IsAllDay = false, Category = "Meeting", Color = "#1e88e5", CreatedBy = "Michael Brown" },

      // Tasks
      new() { Title = "Deploy v2.3", Description = "Deploy release 2.3 to production", StartTime = monthStart.AddDays(2).AddHours(8), EndTime = monthStart.AddDays(2).AddHours(10), Location = "", IsAllDay = false, Category = "Task", Color = "#43a047", CreatedBy = "Sarah Chen" },
      new() { Title = "Database Migration", Description = "Run schema migration for new features", StartTime = monthStart.AddDays(4).AddHours(6), EndTime = monthStart.AddDays(4).AddHours(8), Location = "", IsAllDay = false, Category = "Task", Color = "#43a047", CreatedBy = "Michael Brown" },
      new() { Title = "Security Audit", Description = "Perform quarterly security audit", StartTime = monthStart.AddDays(6).AddHours(9), EndTime = monthStart.AddDays(6).AddHours(17), Location = "", IsAllDay = false, Category = "Task", Color = "#43a047", CreatedBy = "Daniel Martinez" },
      new() { Title = "Update Dependencies", Description = "Update all npm and NuGet dependencies to latest", StartTime = monthStart.AddDays(8).AddHours(10), EndTime = monthStart.AddDays(8).AddHours(12), Location = "", IsAllDay = false, Category = "Task", Color = "#43a047", CreatedBy = "Emma Davis" },
      new() { Title = "Performance Testing", Description = "Run load tests on new API endpoints", StartTime = monthStart.AddDays(11).AddHours(13), EndTime = monthStart.AddDays(11).AddHours(16), Location = "", IsAllDay = false, Category = "Task", Color = "#43a047", CreatedBy = "Sarah Chen" },
      new() { Title = "Documentation Update", Description = "Update API documentation for v2.3", StartTime = monthStart.AddDays(13).AddHours(9), EndTime = monthStart.AddDays(13).AddHours(11), Location = "", IsAllDay = false, Category = "Task", Color = "#43a047", CreatedBy = "Olivia Taylor" },
      new() { Title = "Code Review Backlog", Description = "Clear pending code review queue", StartTime = monthStart.AddDays(15).AddHours(10), EndTime = monthStart.AddDays(15).AddHours(12), Location = "", IsAllDay = false, Category = "Task", Color = "#43a047", CreatedBy = "Michael Brown" },

      // Reminders
      new() { Title = "Submit Timesheet", Description = "Weekly timesheet submission deadline", StartTime = monthStart.AddDays(4).AddHours(16), EndTime = monthStart.AddDays(4).AddHours(16).AddMinutes(30), Location = "", IsAllDay = false, Category = "Reminder", Color = "#fb8c00", CreatedBy = "James Wilson" },
      new() { Title = "License Renewal", Description = "Syncfusion license renewal due", StartTime = monthStart.AddDays(9).AddHours(9), EndTime = monthStart.AddDays(9).AddHours(9).AddMinutes(30), Location = "", IsAllDay = false, Category = "Reminder", Color = "#fb8c00", CreatedBy = "Sarah Chen" },
      new() { Title = "Backup Verification", Description = "Verify monthly backup integrity", StartTime = monthStart.AddDays(14).AddHours(8), EndTime = monthStart.AddDays(14).AddHours(8).AddMinutes(30), Location = "", IsAllDay = false, Category = "Reminder", Color = "#fb8c00", CreatedBy = "Michael Brown" },
      new() { Title = "SSL Certificate Check", Description = "Check SSL certificate expiry dates", StartTime = monthStart.AddDays(19).AddHours(10), EndTime = monthStart.AddDays(19).AddHours(10).AddMinutes(30), Location = "", IsAllDay = false, Category = "Reminder", Color = "#fb8c00", CreatedBy = "Daniel Martinez" },
      new() { Title = "Expense Report Due", Description = "Monthly expense report submission", StartTime = monthStart.AddDays(24).AddHours(17), EndTime = monthStart.AddDays(24).AddHours(17).AddMinutes(30), Location = "", IsAllDay = false, Category = "Reminder", Color = "#fb8c00", CreatedBy = "Emma Davis" },

      // Holidays / All-day events
      new() { Title = "Company Offsite", Description = "Annual team building offsite event", StartTime = monthStart.AddDays(16), EndTime = monthStart.AddDays(17), Location = "Mountain Resort", IsAllDay = true, Category = "Holiday", Color = "#8e24aa", CreatedBy = "James Wilson" },
      new() { Title = "Hackathon Day", Description = "Internal hackathon - build anything!", StartTime = monthStart.AddDays(20), EndTime = monthStart.AddDays(20).AddHours(23).AddMinutes(59), Location = "Office", IsAllDay = true, Category = "Holiday", Color = "#8e24aa", CreatedBy = "Sarah Chen" },
      new() { Title = "Training Day", Description = "AWS certification training", StartTime = monthStart.AddDays(22), EndTime = monthStart.AddDays(22).AddHours(23).AddMinutes(59), Location = "Training Center", IsAllDay = true, Category = "Holiday", Color = "#8e24aa", CreatedBy = "Michael Brown" },

      // Recurring standup
      new() { Title = "Daily Standup", Description = "Daily team standup meeting", StartTime = monthStart.AddDays(0).AddHours(9).AddMinutes(30), EndTime = monthStart.AddDays(0).AddHours(9).AddMinutes(45), Location = "Virtual - Slack Huddle", IsAllDay = false, RecurrenceRule = "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;COUNT=20", Category = "Meeting", Color = "#00897b", CreatedBy = "James Wilson" },

      // More events for variety
      new() { Title = "Product Launch Prep", Description = "Prepare for v3.0 product launch", StartTime = monthStart.AddDays(17).AddHours(10), EndTime = monthStart.AddDays(17).AddHours(12), Location = "Conference Room A", IsAllDay = false, Category = "Meeting", Color = "#1e88e5", CreatedBy = "Emma Davis" },
      new() { Title = "UX Research Session", Description = "User interviews for new feature", StartTime = monthStart.AddDays(18).AddHours(13), EndTime = monthStart.AddDays(18).AddHours(15), Location = "UX Lab", IsAllDay = false, Category = "Meeting", Color = "#1e88e5", CreatedBy = "Olivia Taylor" },
      new() { Title = "Release Notes Draft", Description = "Draft release notes for v2.3", StartTime = monthStart.AddDays(21).AddHours(10), EndTime = monthStart.AddDays(21).AddHours(11).AddMinutes(30), Location = "", IsAllDay = false, Category = "Task", Color = "#43a047", CreatedBy = "Sarah Chen" },
      new() { Title = "QA Sign-off", Description = "Final QA sign-off for sprint deliverables", StartTime = monthStart.AddDays(23).AddHours(14), EndTime = monthStart.AddDays(23).AddHours(15), Location = "", IsAllDay = false, Category = "Task", Color = "#43a047", CreatedBy = "Daniel Martinez" },
      new() { Title = "Team Lunch", Description = "Monthly team lunch outing", StartTime = monthStart.AddDays(25).AddHours(12), EndTime = monthStart.AddDays(25).AddHours(13).AddMinutes(30), Location = "Downtown Bistro", IsAllDay = false, Category = "Holiday", Color = "#8e24aa", CreatedBy = "James Wilson" },
      new() { Title = "Infra Cost Review", Description = "Review cloud infrastructure costs and optimize", StartTime = monthStart.AddDays(26).AddHours(9), EndTime = monthStart.AddDays(26).AddHours(10), Location = "Virtual - Teams", IsAllDay = false, Category = "Meeting", Color = "#1e88e5", CreatedBy = "Michael Brown" },
    ];
  }

  private static List<Role> GetRoles() =>
  [
    new()
    {
      Name = "Admin", Description = "Full system access with all permissions", IsBuiltIn = true,
      Permissions = ["ViewDashboard", "ManageUsers", "ManageRoles", "EditProducts", "ViewProducts", "ManageSettings", "ViewAlerts", "ManageAlerts", "ViewOrders", "ManageOrders", "ViewReports", "ManageReports", "ViewCalendar", "ManageCalendar", "ViewKanban", "ManageKanban", "ViewEditor", "ViewNotifications", "ViewActivityLog", "ViewForms", "ViewComponents", "ViewMarketplace", "AdminAccess"]
    },
    new()
    {
      Name = "Manager", Description = "Can manage products, orders, and team resources", IsBuiltIn = true,
      Permissions = ["ViewDashboard", "EditProducts", "ViewProducts", "ViewAlerts", "ManageAlerts", "ViewOrders", "ManageOrders", "ViewReports", "ViewCalendar", "ManageCalendar", "ViewKanban", "ManageKanban", "ViewEditor", "ViewNotifications", "ViewActivityLog", "ViewForms", "ViewComponents"]
    },
    new()
    {
      Name = "Viewer", Description = "Read-only access to most areas", IsBuiltIn = true,
      Permissions = ["ViewDashboard", "ViewProducts", "ViewAlerts", "ViewOrders", "ViewReports", "ViewCalendar", "ViewKanban", "ViewEditor", "ViewNotifications", "ViewActivityLog", "ViewForms", "ViewComponents"]
    },
    new()
    {
      Name = "Analyst", Description = "Access to dashboards, reports, and read-only data", IsBuiltIn = true,
      Permissions = ["ViewDashboard", "ViewProducts", "ViewAlerts", "ViewOrders", "ViewReports", "ViewCalendar", "ViewEditor", "ViewNotifications", "ViewActivityLog"]
    },
  ];

  private static List<AuditEntry> GetAuditEntries()
  {
    var now = DateTime.UtcNow;
    var entries = new List<AuditEntry>();

    var users = new (int Id, string Name)[]
    {
      (1, "demo"), (2, "admin"), (3, "manager"), (4, "viewer"),
      (5, "jwilson"), (6, "schen"), (7, "mbrown"), (8, "edavis"),
      (9, "dmartinez"), (10, "otaylor"),
    };

    var ips = new[] { "192.168.1.10", "10.0.0.25", "172.16.0.42", "192.168.1.55", "10.0.0.100" };

    // Login/Logout entries (20)
    for (var i = 0; i < 10; i++)
    {
      var user = users[i % users.Length];
      entries.Add(new AuditEntry { UserId = user.Id, UserName = user.Name, Action = AuditAction.LoggedIn, EntityType = "Auth", EntityId = "session", Details = "User logged in successfully", Timestamp = now.AddDays(-i).AddHours(-2), IpAddress = ips[i % ips.Length] });
      entries.Add(new AuditEntry { UserId = user.Id, UserName = user.Name, Action = AuditAction.LoggedOut, EntityType = "Auth", EntityId = "session", Details = "User logged out", Timestamp = now.AddDays(-i).AddHours(-1), IpAddress = ips[i % ips.Length] });
    }

    // User CRUD entries (20)
    for (var i = 0; i < 20; i++)
    {
      var actor = users[i % users.Length];
      var actions = new[] { AuditAction.Created, AuditAction.Updated, AuditAction.Viewed, AuditAction.Deleted };
      var action = actions[i % actions.Length];
      var targetId = (i + 10).ToString();
      var details = action switch
      {
        AuditAction.Created => $"Created user account #{targetId}",
        AuditAction.Updated => $"Updated user profile #{targetId}",
        AuditAction.Viewed => $"Viewed user details #{targetId}",
        AuditAction.Deleted => $"Deleted user account #{targetId}",
        _ => "User operation"
      };
      entries.Add(new AuditEntry { UserId = actor.Id, UserName = actor.Name, Action = action, EntityType = "User", EntityId = targetId, Details = details, Timestamp = now.AddDays(-i).AddHours(-3).AddMinutes(-i * 7), IpAddress = ips[i % ips.Length] });
    }

    // Product CRUD entries (25)
    var productNames = new[] { "iPhone 15 Pro", "Samsung Galaxy S24", "MacBook Pro", "Sony WH-1000XM5", "Dell XPS 15", "Nike Air Max", "KitchenAid Mixer", "Dyson V15", "iPad Air M2", "Canon EOS R6" };
    for (var i = 0; i < 25; i++)
    {
      var actor = users[i % users.Length];
      var actions = new[] { AuditAction.Created, AuditAction.Updated, AuditAction.Updated, AuditAction.Viewed, AuditAction.Deleted };
      var action = actions[i % actions.Length];
      var productName = productNames[i % productNames.Length];
      var productId = (i + 1).ToString();
      var details = action switch
      {
        AuditAction.Created => $"Added product: {productName}",
        AuditAction.Updated => $"Updated pricing for {productName}",
        AuditAction.Viewed => $"Viewed product details: {productName}",
        AuditAction.Deleted => $"Removed product: {productName}",
        _ => "Product operation"
      };
      entries.Add(new AuditEntry { UserId = actor.Id, UserName = actor.Name, Action = action, EntityType = "Product", EntityId = productId, Details = details, Timestamp = now.AddDays(-i % 30).AddHours(-5).AddMinutes(-i * 13), IpAddress = ips[i % ips.Length] });
    }

    // Order entries (25)
    for (var i = 0; i < 25; i++)
    {
      var actor = users[i % users.Length];
      var actions = new[] { AuditAction.Created, AuditAction.Updated, AuditAction.Viewed, AuditAction.Viewed, AuditAction.Updated };
      var action = actions[i % actions.Length];
      var orderId = (1001 + i).ToString();
      var details = action switch
      {
        AuditAction.Created => $"Created order #{orderId}",
        AuditAction.Updated => $"Updated order #{orderId} status",
        AuditAction.Viewed => $"Viewed order #{orderId} details",
        _ => "Order operation"
      };
      entries.Add(new AuditEntry { UserId = actor.Id, UserName = actor.Name, Action = action, EntityType = "Order", EntityId = orderId, Details = details, Timestamp = now.AddDays(-(i % 28)).AddHours(-8).AddMinutes(-i * 11), IpAddress = ips[i % ips.Length] });
    }

    // Settings entries (10)
    var settingKeys = new[] { "theme", "locale", "notifications", "security", "api-keys" };
    for (var i = 0; i < 10; i++)
    {
      var actor = users[i % 3];
      var key = settingKeys[i % settingKeys.Length];
      entries.Add(new AuditEntry { UserId = actor.Id, UserName = actor.Name, Action = AuditAction.Updated, EntityType = "Settings", EntityId = key, Details = $"Updated {key} settings", Timestamp = now.AddDays(-(i * 3)).AddHours(-6), IpAddress = ips[i % ips.Length] });
    }

    // Notification entries (10)
    for (var i = 0; i < 10; i++)
    {
      var actor = users[i % users.Length];
      var notifId = (i + 1).ToString();
      entries.Add(new AuditEntry { UserId = actor.Id, UserName = actor.Name, Action = AuditAction.Viewed, EntityType = "Notification", EntityId = notifId, Details = $"Read notification #{notifId}", Timestamp = now.AddDays(-(i % 15)).AddHours(-4).AddMinutes(-i * 17), IpAddress = ips[i % ips.Length] });
    }

    return entries;
  }

  private static SystemSettings GetSystemSettings() =>
    new()
    {
      // General
      AppName = "Enterprise Dashboard",
      Timezone = "UTC",
      DefaultLanguage = "en",
      DateFormat = "MM/DD/YYYY",
      CurrencyFormat = "USD",

      // Security
      MinPasswordLength = 8,
      RequireUppercase = true,
      RequireNumber = true,
      RequireSpecialChar = false,
      Enforce2FA = false,
      SessionTimeoutMinutes = 30,
      MaxLoginAttempts = 5,

      // Email
      SmtpHost = "smtp.example.com",
      SmtpPort = 587,
      SmtpUsername = "noreply@example.com",
      SmtpPassword = "",
      FromAddress = "noreply@example.com",
      EnableTls = true,

      // Notifications
      EnableEmailNotifications = true,
      EnableInAppNotifications = true,
      EnableSmsNotifications = false,
      AlertSeverityThreshold = "warning",

      // Maintenance
      MaintenanceMode = false,
      MaintenanceStart = null,
      MaintenanceEnd = null,
    };

  private static List<ChatChannel> GetChatChannels() =>
  [
    new() { Name = "General", Description = "General discussion for the team", Icon = "\uD83D\uDCAC" },
    new() { Name = "Engineering", Description = "Engineering topics and code reviews", Icon = "\uD83D\uDEE0\uFE0F" },
    new() { Name = "Design", Description = "Design reviews and UI/UX discussions", Icon = "\uD83C\uDFA8" },
    new() { Name = "Random", Description = "Off-topic chat and fun stuff", Icon = "\uD83C\uDF89" },
  ];

  private static List<ChatMessage> GetChatMessages()
  {
    var now = DateTime.UtcNow;
    return
    [
      // General channel (ChannelId = 1)
      new() { ChannelId = 1, SenderName = "Alice Chen", SenderAvatar = "AC", Content = "Good morning everyone! Ready for the sprint planning?", Timestamp = now.AddHours(-8) },
      new() { ChannelId = 1, SenderName = "Bob Martinez", SenderAvatar = "BM", Content = "Morning! Yes, I've prepared the backlog items.", Timestamp = now.AddHours(-7).AddMinutes(-55) },
      new() { ChannelId = 1, SenderName = "Carol Davis", SenderAvatar = "CD", Content = "Let's make sure we prioritize the auth module refactor.", Timestamp = now.AddHours(-7).AddMinutes(-50) },
      new() { ChannelId = 1, SenderName = "Alice Chen", SenderAvatar = "AC", Content = "Agreed. I'll present the technical debt analysis first.", Timestamp = now.AddHours(-7).AddMinutes(-45) },
      new() { ChannelId = 1, SenderName = "David Kim", SenderAvatar = "DK", Content = "Can we also discuss the new onboarding flow?", Timestamp = now.AddHours(-7).AddMinutes(-30) },
      new() { ChannelId = 1, SenderName = "Bob Martinez", SenderAvatar = "BM", Content = "Sure, I'll add it to the agenda.", Timestamp = now.AddHours(-7).AddMinutes(-25) },
      new() { ChannelId = 1, SenderName = "Eve Johnson", SenderAvatar = "EJ", Content = "Don't forget about the quarterly review next week.", Timestamp = now.AddHours(-6) },
      new() { ChannelId = 1, SenderName = "Carol Davis", SenderAvatar = "CD", Content = "Thanks for the reminder, Eve!", Timestamp = now.AddHours(-5).AddMinutes(-45) },
      new() { ChannelId = 1, SenderName = "Alice Chen", SenderAvatar = "AC", Content = "Sprint planning is at 2 PM in the main conference room.", Timestamp = now.AddHours(-4) },
      new() { ChannelId = 1, SenderName = "David Kim", SenderAvatar = "DK", Content = "I'll be there. Just finishing up a PR review.", Timestamp = now.AddHours(-3).AddMinutes(-30) },

      // Engineering channel (ChannelId = 2)
      new() { ChannelId = 2, SenderName = "Alice Chen", SenderAvatar = "AC", Content = "Just pushed the new API endpoint for user preferences.", Timestamp = now.AddHours(-6) },
      new() { ChannelId = 2, SenderName = "David Kim", SenderAvatar = "DK", Content = "Nice! I'll review it after lunch. What's the PR number?", Timestamp = now.AddHours(-5).AddMinutes(-50) },
      new() { ChannelId = 2, SenderName = "Alice Chen", SenderAvatar = "AC", Content = "PR #342. I also added integration tests.", Timestamp = now.AddHours(-5).AddMinutes(-45) },
      new() { ChannelId = 2, SenderName = "Bob Martinez", SenderAvatar = "BM", Content = "The CI pipeline is green. Good to merge after review.", Timestamp = now.AddHours(-5).AddMinutes(-30) },
      new() { ChannelId = 2, SenderName = "David Kim", SenderAvatar = "DK", Content = "Found a minor issue with the error handling. Left a comment.", Timestamp = now.AddHours(-4) },
      new() { ChannelId = 2, SenderName = "Alice Chen", SenderAvatar = "AC", Content = "Fixed! Updated the PR with the suggested changes.", Timestamp = now.AddHours(-3).AddMinutes(-30) },
      new() { ChannelId = 2, SenderName = "Bob Martinez", SenderAvatar = "BM", Content = "Has anyone looked into the memory leak in the dashboard?", Timestamp = now.AddHours(-3) },
      new() { ChannelId = 2, SenderName = "Carol Davis", SenderAvatar = "CD", Content = "I profiled it yesterday. Looks like it's the chart component.", Timestamp = now.AddHours(-2).AddMinutes(-45) },
      new() { ChannelId = 2, SenderName = "David Kim", SenderAvatar = "DK", Content = "We should upgrade the chart library. Version 5 has a fix.", Timestamp = now.AddHours(-2).AddMinutes(-30) },
      new() { ChannelId = 2, SenderName = "Alice Chen", SenderAvatar = "AC", Content = "I'll create a ticket for that and prioritize it.", Timestamp = now.AddHours(-2) },

      // Design channel (ChannelId = 3)
      new() { ChannelId = 3, SenderName = "Eve Johnson", SenderAvatar = "EJ", Content = "Updated the Figma file with the new color palette.", Timestamp = now.AddHours(-7) },
      new() { ChannelId = 3, SenderName = "Carol Davis", SenderAvatar = "CD", Content = "Love the new accent colors! Much more vibrant.", Timestamp = now.AddHours(-6).AddMinutes(-45) },
      new() { ChannelId = 3, SenderName = "Eve Johnson", SenderAvatar = "EJ", Content = "Thanks! I also updated the dark mode variants.", Timestamp = now.AddHours(-6).AddMinutes(-30) },
      new() { ChannelId = 3, SenderName = "Bob Martinez", SenderAvatar = "BM", Content = "The accessibility contrast ratios look good on the new colors.", Timestamp = now.AddHours(-5) },
      new() { ChannelId = 3, SenderName = "Eve Johnson", SenderAvatar = "EJ", Content = "I ran all colors through the WCAG checker. All AA compliant.", Timestamp = now.AddHours(-4).AddMinutes(-45) },
      new() { ChannelId = 3, SenderName = "Carol Davis", SenderAvatar = "CD", Content = "Should we schedule a design review for the new dashboard layout?", Timestamp = now.AddHours(-4) },
      new() { ChannelId = 3, SenderName = "Eve Johnson", SenderAvatar = "EJ", Content = "Yes! How about Thursday at 3 PM?", Timestamp = now.AddHours(-3).AddMinutes(-30) },
      new() { ChannelId = 3, SenderName = "Carol Davis", SenderAvatar = "CD", Content = "Works for me. I'll send out the invite.", Timestamp = now.AddHours(-3) },
      new() { ChannelId = 3, SenderName = "David Kim", SenderAvatar = "DK", Content = "Can you share the mobile mockups before the review?", Timestamp = now.AddHours(-2) },
      new() { ChannelId = 3, SenderName = "Eve Johnson", SenderAvatar = "EJ", Content = "Sure, I'll share them tomorrow morning.", Timestamp = now.AddHours(-1).AddMinutes(-30) },

      // Random channel (ChannelId = 4)
      new() { ChannelId = 4, SenderName = "Bob Martinez", SenderAvatar = "BM", Content = "Anyone up for lunch at the new Thai place?", Timestamp = now.AddHours(-5) },
      new() { ChannelId = 4, SenderName = "Eve Johnson", SenderAvatar = "EJ", Content = "Count me in! Their pad thai is amazing.", Timestamp = now.AddHours(-4).AddMinutes(-55) },
      new() { ChannelId = 4, SenderName = "David Kim", SenderAvatar = "DK", Content = "I'm in! What time?", Timestamp = now.AddHours(-4).AddMinutes(-50) },
      new() { ChannelId = 4, SenderName = "Bob Martinez", SenderAvatar = "BM", Content = "12:30? Meet at the lobby.", Timestamp = now.AddHours(-4).AddMinutes(-45) },
      new() { ChannelId = 4, SenderName = "Alice Chen", SenderAvatar = "AC", Content = "Save me a spot! Running a bit late from a meeting.", Timestamp = now.AddHours(-4).AddMinutes(-30) },
      new() { ChannelId = 4, SenderName = "Carol Davis", SenderAvatar = "CD", Content = "Fun fact: TypeScript was released 12 years ago this month!", Timestamp = now.AddHours(-3) },
      new() { ChannelId = 4, SenderName = "David Kim", SenderAvatar = "DK", Content = "Time flies! Hard to imagine JS without types now.", Timestamp = now.AddHours(-2).AddMinutes(-45) },
      new() { ChannelId = 4, SenderName = "Eve Johnson", SenderAvatar = "EJ", Content = "Speaking of milestones, happy work anniversary to Alice!", Timestamp = now.AddHours(-2) },
      new() { ChannelId = 4, SenderName = "Alice Chen", SenderAvatar = "AC", Content = "Aw, thanks everyone! Three years already!", Timestamp = now.AddHours(-1).AddMinutes(-30) },
      new() { ChannelId = 4, SenderName = "Bob Martinez", SenderAvatar = "BM", Content = "Congrats Alice! Here's to many more.", Timestamp = now.AddHours(-1) },
    ];
  }

  private static List<GanttTask> GetGanttTasks()
  {
    var start = DateTime.UtcNow.Date;
    return
    [
      new() { TaskName = "Project Kickoff", StartDate = start, EndDate = start.AddDays(1), Duration = 1, Progress = 100, Assignee = "Alice Chen", Priority = "High" },
      new() { TaskName = "Requirements Gathering", StartDate = start.AddDays(1), EndDate = start.AddDays(5), Duration = 4, Progress = 80, ParentTaskId = 1, Assignee = "Bob Martinez", Priority = "High" },
      new() { TaskName = "Architecture Design", StartDate = start.AddDays(5), EndDate = start.AddDays(10), Duration = 5, Progress = 60, Dependencies = "2", Assignee = "Carol Davis", Priority = "High" },
      new() { TaskName = "Backend Development", StartDate = start.AddDays(10), EndDate = start.AddDays(25), Duration = 15, Progress = 40, Dependencies = "3", Assignee = "David Kim", Priority = "Normal" },
      new() { TaskName = "Frontend Development", StartDate = start.AddDays(12), EndDate = start.AddDays(27), Duration = 15, Progress = 30, Dependencies = "3", Assignee = "Alice Chen", Priority = "Normal" },
      new() { TaskName = "API Integration", StartDate = start.AddDays(20), EndDate = start.AddDays(28), Duration = 8, Progress = 10, Dependencies = "4,5", Assignee = "Eve Johnson", Priority = "Normal" },
      new() { TaskName = "Testing", StartDate = start.AddDays(25), EndDate = start.AddDays(32), Duration = 7, Progress = 0, Dependencies = "6", Assignee = "Bob Martinez", Priority = "High" },
      new() { TaskName = "Documentation", StartDate = start.AddDays(28), EndDate = start.AddDays(33), Duration = 5, Progress = 0, Dependencies = "6", Assignee = "Carol Davis", Priority = "Low" },
      new() { TaskName = "Deployment", StartDate = start.AddDays(33), EndDate = start.AddDays(35), Duration = 2, Progress = 0, Dependencies = "7,8", Assignee = "David Kim", Priority = "Critical" },
      new() { TaskName = "Post-Launch Monitoring", StartDate = start.AddDays(35), EndDate = start.AddDays(40), Duration = 5, Progress = 0, Dependencies = "9", Assignee = "Eve Johnson", Priority = "Normal" },
    ];
  }

  private static List<Organization> GetOrganizations() =>
  [
    new() { Name = "Acme Corp", Slug = "acme-corp", LogoUrl = "https://picsum.photos/seed/acme/200", Plan = "Enterprise", MemberCount = 150 },
    new() { Name = "Globex Inc", Slug = "globex-inc", LogoUrl = "https://picsum.photos/seed/globex/200", Plan = "Pro", MemberCount = 45 },
    new() { Name = "Initech", Slug = "initech", LogoUrl = "https://picsum.photos/seed/initech/200", Plan = "Free", MemberCount = 12 },
  ];
}
