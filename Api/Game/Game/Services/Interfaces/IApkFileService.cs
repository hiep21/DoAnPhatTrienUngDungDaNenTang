using Game.Dtos.ApkFile;
using Game.Dtos.Register;
using Game.Services.Implements;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.EntityFrameworkCore;

namespace Game.Services.Interfaces
{
    public interface IApkFileService
    {
        Task<ApkFileDto> UploadApkAsync(ApkFileDto apkDto);//, InfoFileDto apkFormFile);
        
        List<ApkFileDto> GetFile();

    }
}
