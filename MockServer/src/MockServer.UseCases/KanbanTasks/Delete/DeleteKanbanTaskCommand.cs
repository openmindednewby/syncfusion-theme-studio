namespace MockServer.UseCases.KanbanTasks.Delete;

public record DeleteKanbanTaskCommand(int Id) : IRequest<Result>;
