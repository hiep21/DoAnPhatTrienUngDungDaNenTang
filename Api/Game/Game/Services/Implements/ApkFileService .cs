using Game.DbContexts;
using Game.Dtos.Register;
using Game.Entities;
using Game.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Game.Services.Implements
{
    public class ApkFileService:IApkFileService
    {
        public async Task<ApkFileDto> UploadApkAsync(ApkFileDto apkDto)
        {
            if (apkDto == null || string.IsNullOrEmpty(apkDto.FileName))
            {
                return null;
            }

            // Thư mục đích để lưu tệp APK.
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

            // Tạo thư mục nếu nó chưa tồn tại.
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            return apkDto;
        }

    }
}
