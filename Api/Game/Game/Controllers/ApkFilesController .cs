using Game.Dtos.Register;
using Game.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;


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

        [HttpPost]
        public async Task<IActionResult> UploadApk(IFormFile apkFile)
        {
            if (apkFile == null || apkFile.Length == 0)
            {
                return BadRequest("Tệp APK không hợp lệ.");
            }

            var apkDto = new ApkFileDto
            {
                FileName = apkFile.FileName
            };

            var uploadedApk = await _apkFileService.UploadApkAsync(apkDto);

            if (uploadedApk == null)
            {
                return BadRequest("Tệp APK không hợp lệ.");
            }

            return Ok(uploadedApk);
        }
    }
}
