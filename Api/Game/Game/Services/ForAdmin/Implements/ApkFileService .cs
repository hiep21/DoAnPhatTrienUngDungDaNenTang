using Game.DbContexts;

using Game.Dtos.ForAdmin.ApkFile;
using Game.Entities.ForAdmin;
using Game.Services.ForAdmin.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;

namespace Game.Services.ForAdmin.Implements
{
    public class ApkFileService : IApkFileService
    {
        private readonly ApplicationDbContext _context;

        public ApkFileService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ApkFileDto> UploadApkAsync(ApkFileDto apkDto)
        {
            var checkApkFile = _context.ApkFiles.FirstOrDefault(f => f.FileName == apkDto.FileName);
            if (checkApkFile != null)
            {
                throw new Exception("Tên file trò chơi bị trùng");
            }
            if (apkDto == null)
            {
                return null;
            }

            var apkFile = new ApkFile
            {
                FileName = apkDto.FileName,
            };

            _context.ApkFiles.Add(apkFile);
            _context.SaveChanges();

            return apkDto;
        }

        public List<ApkFileDto> GetFile()
        {

            var apkFile = new List<ApkFileDto>();
            foreach (var apkFiles in _context.ApkFiles)
            {


                apkFile.Add(new ApkFileDto
                {
                    FileName = apkFiles.FileName,

                });

            }
            return apkFile;
        }
        public void DeleteApkFile(string fileName)
        {
            var game = _context.ApkFiles.FirstOrDefault(f => f.FileName == fileName);
            if (game == null)
            {
                throw new Exception($"Không tìm thấy: {fileName}");
            }
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory() + $"/uploads/{fileName.Replace(".apk", "")}", fileName);
            if (File.Exists(uploadPath))
            {
                File.Delete(uploadPath);
            }
            else
            {
                throw new FileNotFoundException($"Không tìm thấy {fileName} để xóa.");
            }
            _context.Remove(game);
            _context.SaveChanges();
        }
        public void DeleteFolderFile(string fileName)
        {
            var game = _context.ApkFiles.FirstOrDefault(f => f.FileName == fileName);
            if (game == null)
            {
                throw new Exception($"Không tìm thấy: {fileName}");
            }
            _context.Remove(game);
            foreach (var item in _context.ImageFiles)
            {
                if (item.ImagePath == fileName)
                {
                    _context.Remove(item);
                }
            }
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory() + "/uploads", $"{fileName.Replace(".apk", "")}");
            if (Directory.Exists(uploadPath))
            {
                Directory.Delete(uploadPath,true);
            }
            else
            {
                throw new FileNotFoundException($"Không tìm thấy {fileName.Replace(".apk", "")} để xóa.");
            }

            
            _context.SaveChanges();
        }
    }
}
