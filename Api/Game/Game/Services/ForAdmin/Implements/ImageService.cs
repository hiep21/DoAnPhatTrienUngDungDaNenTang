using Game.DbContexts;

using Game.Dtos.ForAdmin.ApkFile;
using Game.Dtos.ForAdmin.ImageFile;
using Game.Entities.ForAdmin;
using Game.Services.ForAdmin.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;

namespace Game.Services.ForAdmin.Implements
{
    public class ImageService : IImageService
    {
        private readonly ApplicationDbContext _context;

        public ImageService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ImageFileDto> UploadImageAsync(ImageFileDto imageDto)//, InfoFileDto infoFileDto)
        {
            var checkImageFile = _context.ImageFiles.FirstOrDefault(f => f.ImageName == imageDto.ImageName);
            if (checkImageFile != null)
            {
                throw new Exception("Tên file trò chơi bị trùng");
            }
            if (imageDto == null)
            {
                return null;
            }

            var imageFile = new ImageFile
            {
                ImageName = imageDto.ImageName,
                ImagePath = imageDto.ImagePath,
            };

            _context.ImageFiles.Add(imageFile);
            _context.SaveChanges();

            return imageDto;
        }
        
       
        public List<ImageFileDto> GetImage()
        {

            var imageFile = new List<ImageFileDto>();
            foreach (var imageFiles in _context.ImageFiles)
            {


                imageFile.Add(new ImageFileDto
                {
                    ImageName = imageFiles.ImageName,
                    ImagePath= imageFiles.ImagePath,
                });

            }
            return imageFile;
        }
        public void DeleteImageFile(string fileName,string imageName)
        {
            var image = _context.ImageFiles.FirstOrDefault(f => f.ImageName == imageName);
            if (image == null)
            {
                throw new Exception($"Không tìm thấy: {imageName}");
            }
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory() + $"/uploads/{fileName.Replace(".apk", "")}/images", imageName);
            if (File.Exists(uploadPath))
            {
                File.Delete(uploadPath);
            }
            else
            {
                throw new FileNotFoundException($"Không tìm thấy {fileName} để xóa.");
            }
            _context.Remove(image);
            _context.SaveChanges();
        }
        
    }
}
