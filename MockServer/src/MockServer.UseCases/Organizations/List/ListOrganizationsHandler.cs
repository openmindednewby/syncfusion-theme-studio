using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.Organizations.List;

public class ListOrganizationsHandler(IRepository<Organization> repository)
  : IRequestHandler<ListOrganizationsQuery, Result<List<OrganizationDto>>>
{
  public async Task<Result<List<OrganizationDto>>> Handle(
    ListOrganizationsQuery request,
    CancellationToken cancellationToken)
  {
    var items = await repository.ListAsync(cancellationToken);
    var dtos = items.Select(DtoMapper.ToDto).ToList();
    return Result.Success(dtos);
  }
}
