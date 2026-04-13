using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.SystemSettings.Get;

public class GetSystemSettingsHandler(IRepository<Core.Entities.SystemSettings> repository)
  : IRequestHandler<GetSystemSettingsQuery, Result<SystemSettingsDto>>
{
  public async Task<Result<SystemSettingsDto>> Handle(
    GetSystemSettingsQuery request,
    CancellationToken cancellationToken)
  {
    var all = await repository.ListAsync(cancellationToken);
    var settings = all.FirstOrDefault();
    if (settings is null) return Result.NotFound("System settings not found.");

    return Result.Success(DtoMapper.ToDto(settings));
  }
}
