using Game.Dtos.ForAdmin;
using Game.Dtos.ForAdmin.ApkFile;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.EntityFrameworkCore;

namespace Game.Services.ForAdmin.Interfaces
{
    public interface IApkFileService
    {
        Task<ApkFileDto> UploadApkAsync(ApkFileDto apkDto);//, InfoFileDto apkFormFile);

        List<ApkFileDto> GetFile();
        void DeleteApkFile(string fileName);
        void DeleteFolderFile(string fileName);
    }
}
