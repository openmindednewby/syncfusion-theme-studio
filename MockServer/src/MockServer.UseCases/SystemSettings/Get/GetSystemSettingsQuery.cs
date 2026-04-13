using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.SystemSettings.Get;

public record GetSystemSettingsQuery : IRequest<Result<SystemSettingsDto>>;
