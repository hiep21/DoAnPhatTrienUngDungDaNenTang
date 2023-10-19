
using Game.Dtos.ForAdmin.ImageFile;

namespace Game.Services.ForAdmin.Interfaces
{
    public interface IImageService
    {
        Task<ImageFileDto> UploadImageAsync(ImageFileDto apkDto,string oldFileName);//, InfoFileDto apkFormFile);

        List<ImageFileDto> GetImage();
        void DeleteImageFile(string fileName,string imageName);
    }
}
