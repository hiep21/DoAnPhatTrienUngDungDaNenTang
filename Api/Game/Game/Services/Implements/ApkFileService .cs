using Game.DbContexts;
using Game.Dtos.ApkFile;
using Game.Dtos.Register;
using Game.Entities;
using Game.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;

namespace Game.Services.Implements
{
    public class ApkFileService : IApkFileService
    {
        private readonly ApplicationDbContext _context;

        public ApkFileService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ApkFileDto> UploadApkAsync(ApkFileDto apkDto)//, InfoFileDto infoFileDto)
        {
            if (apkDto == null )//|| infoFileDto == null)
            {
                return null;
            }


            // Lưu đối tượng ApkFile vào cơ sở dữ liệu với dữ liệu tệp APK
            var apkFile = new ApkFile
            {
                FileName = apkDto.FileName,
                Data = apkDto.Data
            };
            //var infoApkFile = new InfoApkFile
            //{
            //    Name = infoFileDto.Name,
            //    NhaCungCap = infoFileDto.NhaCungCap,
            //    Description = infoFileDto.Description,
            //};

            

            //_context.InfoApkFiles.Add(infoApkFile);
            _context.ApkFiles.Add(apkFile);
            _context.SaveChanges();

            return apkDto;
        }
        
        public List<ApkFileDto> GetFile()
        {

            var apkFile = new List<ApkFileDto>();
            foreach (var apkFiles in _context.ApkFiles)
            {


                apkFile.Add(new ApkFileDto { 
                    FileName = apkFiles.FileName,
                    Data = apkFiles.Data
                });

            }
            return apkFile;
        }
        
    }
}
