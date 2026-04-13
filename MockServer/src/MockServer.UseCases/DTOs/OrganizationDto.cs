namespace MockServer.UseCases.DTOs;

public record OrganizationDto(
  int Id,
  string Name,
  string Slug,
  string LogoUrl,
  string Plan,
  int MemberCount);
