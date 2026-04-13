namespace MockServer.UseCases.GanttTasks.Delete;

public record DeleteGanttTaskCommand(int Id) : IRequest<Result>;
