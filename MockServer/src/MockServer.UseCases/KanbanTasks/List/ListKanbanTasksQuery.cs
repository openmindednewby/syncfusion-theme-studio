using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.KanbanTasks.List;

public record ListKanbanTasksQuery : IRequest<Result<List<KanbanTaskDto>>>;
