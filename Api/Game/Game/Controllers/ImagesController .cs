using Game.Entities;
using Game.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Game.Controllers
{
    [Route("api/images")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageService _iImageService;

        public ImagesController(IImageService iImageService)
        {
            _iImageService = iImageService;
        }
        [HttpPost]
        public IActionResult UploadImage([FromBody] ImageModel model)
        {
            try
            {
                // Giải mã dữ liệu hình ảnh từ base64
                byte[] imageBytes = Convert.FromBase64String(model.ImageData);

                // Tạo tên file từ tên được gửi từ React Native
                string fileName = model.FileName;
                var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
                // Lưu hình ảnh vào thư mục trên máy chủ
                string imagePath = Path.Combine(uploadPath, fileName);
                System.IO.File.WriteAllBytes(imagePath, imageBytes);

                return Ok("Image saved successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("getFile")]
        public IActionResult GetFile()
        {
            try
            {

                return Ok(_iImageService.GetFile());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
