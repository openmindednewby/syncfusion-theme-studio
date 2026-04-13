using MockServer.UseCases.DTOs;
using MockServer.UseCases.Mappers;

namespace MockServer.UseCases.KanbanTasks.Create;

public class CreateKanbanTaskHandler(IRepository<KanbanTask> repository)
  : IRequestHandler<CreateKanbanTaskCommand, Result<KanbanTaskDto>>
{
  public async Task<Result<KanbanTaskDto>> Handle(
    CreateKanbanTaskCommand request,
    CancellationToken cancellationToken)
  {
    var task = new KanbanTask
    {
      Title = request.Title,
      Summary = request.Summary,
      Status = request.Status,
      Priority = request.Priority,
      Assignee = request.Assignee,
      Tags = request.Tags,
      Color = request.Color,
      DueDate = request.DueDate
    };

    var created = await repository.AddAsync(task, cancellationToken);
    return Result.Success(DtoMapper.ToDto(created));
  }
}
