using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.Organizations.GetById;

public record GetOrganizationByIdQuery(int Id) : IRequest<Result<OrganizationDto>>;
