using Game.Dtos.Register;
using Game.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Game.Dtos.ApkFile;
using Game.Entities;

namespace Game.Controllers
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
            if (apkFile == null || apkFile.Length == 0)
            {
                return BadRequest("Tệp APK không hợp lệ.");
            }
            byte[] apkData;
            using (var memoryStream = new MemoryStream())
            {
                await apkFile.CopyToAsync(memoryStream);
                apkData = memoryStream.ToArray();
            }

            //var infoApkDto = new InfoFileDto
            //{
            //    Name = infoApkFile.Name,
            //    NhaCungCap = infoApkFile.NhaCungCap,
            //    Description = infoApkFile.Description,
            //};
            var apkDto = new ApkFileDto
            {
                FileName = apkFile.FileName,
              

            };

            var uploadedApk = await _apkFileService.UploadApkAsync(apkDto);//, infoApkDto);

            if (uploadedApk == null)
            {
                return BadRequest("Tệp APK không hợp lệ.");
            }

            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            

            return Ok(uploadedApk);
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
        
    }
}
