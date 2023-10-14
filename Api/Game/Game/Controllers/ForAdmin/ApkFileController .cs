using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Game.Dtos.ForAdmin;
using Game.Entities;
using System.Diagnostics;
using Game.Services.ForAdmin.Interfaces;
using Game.Dtos.ForAdmin.ApkFile;

namespace Game.Controllers.ForAdmin
{
    [ApiController]
    [Route("[controller]")]
    public class ApkFilesController : ControllerBase
    {
        private readonly IApkFileService _apkFileService;

        public ApkFilesController(IApkFileService apkFileService)
        {
            _apkFileService = apkFileService;
        }

        [HttpPost("addFile")]
        public async Task<IActionResult> UploadApk(IFormFile apkFile)//, InfoApkFile infoApkFile)
        {
            try
            {
                if (apkFile == null || apkFile.Length == 0)
                {
                    return BadRequest("Tệp APK không hợp lệ.");
                }

                // Đọc dữ liệu từ tệp APK
                byte[] apkData;
                using (var memoryStream = new MemoryStream())
                {
                    await apkFile.CopyToAsync(memoryStream);
                    apkData = memoryStream.ToArray();
                }

                var apkDto = new ApkFileDto
                {
                    FileName = apkFile.FileName,
                    
                    // Các thông tin khác nếu cần
                };

                // Gọi service để xử lý tệp APK
                var uploadedApk = await _apkFileService.UploadApkAsync(apkDto);

                if (uploadedApk == null)
                {
                    return BadRequest("Tệp APK không hợp lệ.");
                }

                var uploadPath = Path.Combine(Directory.GetCurrentDirectory()+"/uploads", $"{apkFile.FileName.Replace(".apk","")}");

                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                // Lưu tệp APK vào thư mục uploads
                var filePath = Path.Combine(uploadPath, apkFile.FileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await apkFile.CopyToAsync(fileStream);
                }

                return Ok(uploadedApk);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getFile")]
        public IActionResult GetFile()
        {
            try
            {
                return Ok(_apkFileService.GetFile());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deleteApkFile/{fileName}")]
        public IActionResult DeleteApkFile(string fileName)
        {
       
           
            try
            {
                
                _apkFileService.DeleteApkFile(fileName);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deleteFolderFile/{fileName}")]
        public IActionResult DeleteFolderFile(string fileName)
        {


            try
            {

                _apkFileService.DeleteFolderFile(fileName);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getFile/{fileName}")]
        public IActionResult GetFile(string fileName)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory() + $"/uploads/{fileName.Replace(".apk","")}", fileName);
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("Tệp không tồn tại.");
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            return File(fileBytes, "application/octet-stream", fileName);
        }

    }
}
