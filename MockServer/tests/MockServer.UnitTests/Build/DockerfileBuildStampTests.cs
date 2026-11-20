namespace MockServer.UnitTests.Build;

public sealed class DockerfileBuildStampTests
{
  [Theory]
  [InlineData("BUILD_SHA")]
  [InlineData("BUILD_TIME")]
  public void Dockerfile_WhenFinalStageRead_CarriesBuildStampEnv(string name)
  {
    var final = FinalStage(File.ReadAllText(DockerfilePath()));

    final.Should().Contain($"ARG {name}=");
    final.Should().Contain($"ENV {name}=${name}");
  }

  private static string FinalStage(string dockerfile)
  {
    var start = dockerfile.LastIndexOf(" AS final", StringComparison.Ordinal);
    start.Should().BeGreaterThanOrEqualTo(0);
    return dockerfile[start..];
  }

  private static string DockerfilePath()
  {
    var dir = new DirectoryInfo(AppContext.BaseDirectory);
    while (dir is not null && !File.Exists(Path.Combine(dir.FullName, "MockServer.slnx")))
    {
      dir = dir.Parent;
    }

    dir.Should().NotBeNull();
    return Path.Combine(dir!.FullName, "Dockerfile");
  }
}
