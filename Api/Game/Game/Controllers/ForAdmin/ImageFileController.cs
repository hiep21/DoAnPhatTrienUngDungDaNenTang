using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Game.Dtos.ForAdmin;
using Game.Entities;
using System.Diagnostics;
using Game.Services.ForAdmin.Interfaces;
using Game.Dtos.ForAdmin.ApkFile;
using Game.Dtos.ForAdmin.ImageFile;
using Microsoft.EntityFrameworkCore;
using Game.DbContexts;
using Game.Services.ForAdmin.Implements;

namespace Game.Controllers.ForAdmin
{
    [ApiController]
    [Route("[controller]")]
    public class ImageFileController : ControllerBase
    {
        private readonly IImageService _imageService;

        public ImageFileController(IImageService imageService)
        {
            _imageService = imageService;
        }
    
        [HttpPost("addimage/{FileName}")]
        public async Task<IActionResult> UploadImage(IFormFile imageFile, string FileName)
        {
            try
            {
                if (imageFile == null || imageFile.Length == 0)
                {
                    return BadRequest("Image không hợp lệ.");
                }

                // Tạo một tên file duy nhất sử dụng Guid
                var uniqueFileName = $"{Guid.NewGuid()}.png";

                // Đọc dữ liệu từ tệp APK
                byte[] imageData;
                using (var memoryStream = new MemoryStream())
                {
                    await imageFile.CopyToAsync(memoryStream);
                    imageData = memoryStream.ToArray();
                }

                var apkDto = new ImageFileDto
                {
                    ImageName = uniqueFileName,
                    ImagePath = FileName+".apk",
                    OldFileName = imageFile.FileName,
                    // Các thông tin khác nếu cần
                };

                // Gọi service để xử lý tệp 
                var uploadedImage = await _imageService.UploadImageAsync(apkDto, FileName +".apk");

                if (uploadedImage == null)
                {
                    return BadRequest("Image không hợp lệ.");
                }

                var uploadPath = Path.Combine(Directory.GetCurrentDirectory() + $"/uploads/{FileName}", "Image");

                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                // Lưu tệp APK vào thư mục uploads
                var filePath = Path.Combine(uploadPath, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(fileStream);
                }

                return Ok(uploadedImage);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getImage")]
        public IActionResult GetImage()
        {
            try
            {
                return Ok(_imageService.GetImage());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deleteImage/{fileName}/{imageName}")]
        public IActionResult DeleteImageFile(string fileName,string imageName)
        {


            try
            {
                _imageService.DeleteImageFile(fileName,imageName);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getImage/{fileName}/{image}")]
        public IActionResult GetFile(string fileName, string image)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory() + $"/uploads/{fileName}/Image", image +".png");
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("Tệp không tồn tại.");
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            return File(fileBytes, "application/octet-stream", image+".png");
        }

    }
}
