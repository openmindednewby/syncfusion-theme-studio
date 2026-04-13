namespace MockServer.Web.Documents;

// ─── Accept Payment Response ────────────────────────────────────────────────

public class AcceptPaymentResponse : Endpoint<AcceptPaymentRequest, DocumentResponse>
{
  public override void Configure()
  {
    Post("/documents/accept-payment");
    AllowAnonymous();
    AllowFileUploads();
  }

  public override async Task HandleAsync(AcceptPaymentRequest req, CancellationToken ct)
  {
    await SendOkAsync(new DocumentResponse(0, $"Payment accepted for order {req.OrderNumber}"), ct);
  }
}

// ─── Accept Verification Response ───────────────────────────────────────────

public class AcceptVerificationResponse : Endpoint<AcceptVerificationRequest, DocumentResponse>
{
  public override void Configure()
  {
    Post("/documents/accept-verification");
    AllowAnonymous();
    AllowFileUploads();
  }

  public override async Task HandleAsync(AcceptVerificationRequest req, CancellationToken ct)
  {
    await SendOkAsync(new DocumentResponse(0, $"Verification accepted for order {req.OrderNumber}"), ct);
  }
}

// ─── Upload Attachment ──────────────────────────────────────────────────────

public class UploadAttachment : Endpoint<UploadAttachmentRequest, UploadAttachmentResponse>
{
  public override void Configure()
  {
    Post("/documents/attachments/upload");
    AllowAnonymous();
    AllowFileUploads();
  }

  public override async Task HandleAsync(UploadAttachmentRequest req, CancellationToken ct)
  {
    await SendOkAsync(
      new UploadAttachmentResponse(Guid.NewGuid().ToString(), req.FileName ?? "unknown"),
      ct);
  }
}

// ─── Request / Response DTOs ────────────────────────────────────────────────

public class AcceptPaymentRequest
{
  public string? MdOrder { get; set; }
  public string? OrderNumber { get; set; }
  public string? Checksum { get; set; }
  public string? Operation { get; set; }
  public string? CallbackCreationDate { get; set; }
  public CallBackStatus Status { get; set; }
}

public class AcceptVerificationRequest
{
  public string? MdOrder { get; set; }
  public string? OrderNumber { get; set; }
  public string? Checksum { get; set; }
  public string? Operation { get; set; }
  public string? CallbackCreationDate { get; set; }
  public CallBackStatus Status { get; set; }
}

public class UploadAttachmentRequest
{
  public byte[]? FileContent { get; set; }
  public string? FileName { get; set; }
  public string? ContentType { get; set; }
  public FileCategory FileCategory { get; set; }
}

public enum CallBackStatus
{
  Deposited = 0,
  Approved = 1,
  Declined = 2,
  Reversed = 3,
  Refunded = 4,
}

public enum FileCategory
{
  General = 0,
  Invoice = 1,
  Receipt = 2,
  Contract = 3,
}

public record DocumentResponse(int Status, string? Message);

public record UploadAttachmentResponse(string? AttachmentId, string? FileName);
