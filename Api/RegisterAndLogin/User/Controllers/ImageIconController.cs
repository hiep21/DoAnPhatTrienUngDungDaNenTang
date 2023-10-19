using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using User.Services.Interfaces;
using User.Dtos.ImageIcon;

namespace User.Controllers.ForAdmin
{
    [ApiController]
    [Route("[controller]")]
    public class ImageIconController : ControllerBase
    {
        private readonly IImageIconService _imageService;

        public ImageIconController(IImageIconService imageService)
        {
            _imageService = imageService;
        }
    
        [HttpPost("addimage/{username}")]
        public async Task<IActionResult> UploadImage(IFormFile imageFile, string username)
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

                var apkDto = new ImageIconDto
                {
                    ImageName = uniqueFileName,
                    ImagePath = username,
                    OldFileName = imageFile.FileName,
                    // Các thông tin khác nếu cần
                };

                // Gọi service để xử lý tệp 
                var uploadedImage = await _imageService.UploadImageAsync(apkDto, username );

                if (uploadedImage == null)
                {
                    return BadRequest("Image không hợp lệ.");
                }

                var uploadPath = Path.Combine(Directory.GetCurrentDirectory() + $"/uploads/", username);

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
        [HttpDelete("deleteImage/{username}/{imageName}")]
        public IActionResult DeleteImageFile(string username, string imageName)
        {


            try
            {
                _imageService.DeleteImageFile(username, imageName);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getImage/{username}/{image}")]
        public IActionResult GetFile(string username, string image)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory() + $"/uploads/{username}", image +".png");
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("Tệp không tồn tại.");
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            return File(fileBytes, "application/octet-stream", image+".png");
        }
    }
}
