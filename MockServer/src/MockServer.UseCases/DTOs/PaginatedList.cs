namespace MockServer.UseCases.DTOs;

public record PaginatedList<T>(List<T> Items, int Total, int Skip, int Limit);
