using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Organizations.List;

public record ListOrganizationsQuery : IRequest<Result<List<OrganizationDto>>>;
