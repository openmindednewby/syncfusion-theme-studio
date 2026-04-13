using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Organizations.GetById;

public class GetOrganizationByIdHandler(IRepository<Organization> repository)
  : IRequestHandler<GetOrganizationByIdQuery, Result<OrganizationDto>>
{
  public async Task<Result<OrganizationDto>> Handle(
    GetOrganizationByIdQuery request,
    CancellationToken cancellationToken)
  {
    var organization = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (organization is null)
      return Result.NotFound();

    return Result.Success(DtoMapper.ToDto(organization));
  }
}
