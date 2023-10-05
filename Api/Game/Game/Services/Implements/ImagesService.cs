using Game.DbContexts;
using Game.Dtos.Register;
using Game.Entities;
using Game.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Game.Services.Implements
{
    public class ImagesService: IImageService
    {
        private readonly ApplicationDbContext _context;

        public ImagesService(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<ImageModel> GetFile()
        {

            var apkFile = new List<ImageModel>();
            foreach (var apkFiles in _context.ApkFiles)
            {


                apkFile.Add(new ImageModel
                {
                    FileName = apkFiles.FileName,
                    //Data = apkFiles.Data
                });

            }
            return apkFile;
        }
    }
}
