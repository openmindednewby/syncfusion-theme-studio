namespace MockServer.Core.Entities;

public class User : BaseEntity
{
  public string FirstName { get; set; } = string.Empty;
  public string LastName { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public string Phone { get; set; } = string.Empty;
  public string Username { get; set; } = string.Empty;
  public DateTime BirthDate { get; set; }
  public string Image { get; set; } = string.Empty;
  public Address Address { get; set; } = new();
}
