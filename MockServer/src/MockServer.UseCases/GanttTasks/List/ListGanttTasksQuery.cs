using MockServer.UseCases.DTOs;

namespace MockServer.UseCases.GanttTasks.List;

public record ListGanttTasksQuery : IRequest<Result<List<GanttTaskDto>>>;
