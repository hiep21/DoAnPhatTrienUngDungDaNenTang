

using User.Dtos.ImageIcon;

namespace User.Services.Interfaces
{
    public interface IImageIconService
    {
        Task<ImageIconDto> UploadImageAsync(ImageIconDto apkDto,string oldFileName);//, InfoFileDto apkFormFile);

        List<ImageIconDto> GetImage();
        void DeleteImageFile(string fileName,string imageName);
    }
}
