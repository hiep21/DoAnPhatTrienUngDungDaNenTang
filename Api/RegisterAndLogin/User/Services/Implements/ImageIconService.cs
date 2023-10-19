
using User.Dtos.ImageIcon;
using User.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using System.Security.Cryptography;
using User.Services.Interfaces;
using User.DbContexts;

namespace User.Services.Implements
{
    public class ImageIconService : IImageIconService
    {
        public readonly ApplicationDbContext _context;

        public ImageIconService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ImageIconDto> UploadImageAsync(ImageIconDto imageDto, string oldFileName)//, InfoFileDto infoFileDto)
        {
            
            var checkImageFile = _context.ImageIcons.FirstOrDefault(f => f.OldFileName == imageDto.OldFileName);
            if (checkImageFile != null)
            {
                throw new Exception("Image bị trùng");
            }

            if (imageDto == null)
            {
                return null;
            }

            var imageFile = new ImageIcon
            {
                ImageName = imageDto.ImageName,
                ImagePath = imageDto.ImagePath,
                OldFileName = imageDto.OldFileName,
            };

            _context.ImageIcons.Add(imageFile);
            _context.SaveChanges();

            return imageDto;
        }
        
       
        public List<ImageIconDto> GetImage()
        {

            var imageFile = new List<ImageIconDto>();
            foreach (var imageFiles in _context.ImageIcons)
            {


                imageFile.Add(new ImageIconDto
                {
                    ImageName = imageFiles.ImageName,
                    ImagePath= imageFiles.ImagePath,
                    OldFileName = imageFiles.OldFileName,
                });

            }
            return imageFile;
        }
        public void DeleteImageFile(string username, string imageName)
        {
            var image = _context.ImageIcons.FirstOrDefault(f => f.ImageName == imageName+".png");
            if (image == null)
            {
                throw new Exception($"Không tìm thấy: {imageName}");
            }
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory() + $"/uploads/{username}", imageName + ".png");
            if (File.Exists(uploadPath))
            {
                File.Delete(uploadPath);
            }
            else
            {
                throw new FileNotFoundException($"Không tìm thấy {username} để xóa.");
            }
            _context.Remove(image);
            _context.SaveChanges();
        }
        
    }
}
