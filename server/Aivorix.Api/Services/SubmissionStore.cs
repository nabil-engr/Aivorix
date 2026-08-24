using System.Text.Json;

namespace Aivorix.Api.Services;

public sealed class SubmissionStore(IWebHostEnvironment environment)
{
    private readonly SemaphoreSlim _gate = new(1, 1);
    private readonly JsonSerializerOptions _jsonOptions = new() { WriteIndented = true };

    public async Task SaveAsync<T>(string fileName, T item, CancellationToken cancellationToken = default)
    {
        if (Path.GetFileName(fileName) != fileName)
        {
            throw new ArgumentException("A plain file name is required.", nameof(fileName));
        }

        var directory = Path.Combine(environment.ContentRootPath, "App_Data");
        var path = Path.Combine(directory, fileName);
        Directory.CreateDirectory(directory);

        await _gate.WaitAsync(cancellationToken);
        string? temporaryPath = null;

        try
        {
            List<T> items = [];
            if (File.Exists(path))
            {
                await using var input = File.OpenRead(path);
                items = await JsonSerializer.DeserializeAsync<List<T>>(input, _jsonOptions, cancellationToken) ?? [];
            }

            items.Add(item);
            temporaryPath = Path.Combine(directory, $".{fileName}.{Guid.NewGuid():N}.tmp");

            await using (var output = new FileStream(
                temporaryPath,
                FileMode.CreateNew,
                FileAccess.Write,
                FileShare.None,
                bufferSize: 4096,
                FileOptions.Asynchronous | FileOptions.WriteThrough))
            {
                await JsonSerializer.SerializeAsync(output, items, _jsonOptions, cancellationToken);
                await output.FlushAsync(cancellationToken);
            }

            File.Move(temporaryPath, path, overwrite: true);
            temporaryPath = null;
        }
        finally
        {
            if (temporaryPath is not null)
            {
                File.Delete(temporaryPath);
            }

            _gate.Release();
        }
    }
}
