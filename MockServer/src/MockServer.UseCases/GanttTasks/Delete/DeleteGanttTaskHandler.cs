namespace MockServer.UseCases.GanttTasks.Delete;

public class DeleteGanttTaskHandler(IRepository<GanttTask> repository)
  : IRequestHandler<DeleteGanttTaskCommand, Result>
{
  public async Task<Result> Handle(
    DeleteGanttTaskCommand request,
    CancellationToken cancellationToken)
  {
    var task = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (task is null) return Result.NotFound($"GanttTask with id {request.Id} not found.");

    await repository.DeleteAsync(task, cancellationToken);
    return Result.Success();
  }
}
