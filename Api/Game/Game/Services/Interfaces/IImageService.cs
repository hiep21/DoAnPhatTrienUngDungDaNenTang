using Game.Dtos.ApkFile;
using Game.Entities;

namespace Game.Services.Interfaces
{
    public interface IImageService
    {
        List<ImageModel> GetFile();
    }
}
