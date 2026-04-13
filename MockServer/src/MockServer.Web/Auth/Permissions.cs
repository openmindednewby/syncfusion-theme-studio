namespace MockServer.Web.Auth;

public class Permissions : EndpointWithoutRequest<PermissionsResponse>
{
  public override void Configure()
  {
    Get("/auth/permissions");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken ct)
  {
    var mapping = new Dictionary<string, string[]>
    {
      ["Admin"] =
      [
        "ViewDashboard", "ManageUsers", "ManageRoles", "EditProducts",
        "ViewProducts", "ManageSettings", "ViewAlerts", "ManageAlerts",
        "ViewOrders", "ManageOrders", "ViewReports", "ManageReports",
        "ViewCalendar", "ManageCalendar", "ViewKanban", "ManageKanban",
        "ViewNotifications", "ViewActivityLog", "ViewForms",
        "ViewComponents", "ViewMarketplace", "AdminAccess",
      ],
      ["Manager"] =
      [
        "ViewDashboard", "EditProducts", "ViewProducts", "ViewAlerts",
        "ManageAlerts", "ViewOrders", "ManageOrders", "ViewReports",
        "ViewCalendar", "ManageCalendar", "ViewKanban", "ManageKanban",
        "ViewNotifications", "ViewActivityLog", "ViewForms",
        "ViewComponents",
      ],
      ["Viewer"] =
      [
        "ViewDashboard", "ViewProducts", "ViewAlerts", "ViewOrders",
        "ViewReports", "ViewCalendar", "ViewKanban", "ViewNotifications",
        "ViewActivityLog", "ViewForms", "ViewComponents",
      ],
      ["Analyst"] =
      [
        "ViewDashboard", "ViewProducts", "ViewAlerts", "ViewOrders",
        "ViewReports", "ViewCalendar", "ViewNotifications",
        "ViewActivityLog",
      ],
    };

    await SendOkAsync(new PermissionsResponse(mapping), ct);
  }
}

public record PermissionsResponse(Dictionary<string, string[]> Roles);
