namespace MockServer.UseCases.KanbanTasks.Delete;

public class DeleteKanbanTaskHandler(IRepository<KanbanTask> repository)
  : IRequestHandler<DeleteKanbanTaskCommand, Result>
{
  public async Task<Result> Handle(
    DeleteKanbanTaskCommand request,
    CancellationToken cancellationToken)
  {
    var task = await repository.GetByIdAsync(request.Id, cancellationToken);
    if (task is null) return Result.NotFound($"KanbanTask with id {request.Id} not found.");

    await repository.DeleteAsync(task, cancellationToken);
    return Result.Success();
  }
}
