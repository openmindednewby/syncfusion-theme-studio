namespace MockServer.UseCases.Orders.Delete;

public record DeleteOrderCommand(int Id) : IRequest<Result>;
