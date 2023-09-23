using Game.Dtos.Register;
using Game.Services.Implements;

namespace Game.Services.Interfaces
{
    public interface IApkFileService
    {
        Task<ApkFileDto> UploadApkAsync(ApkFileDto apkDto);
    }
}
