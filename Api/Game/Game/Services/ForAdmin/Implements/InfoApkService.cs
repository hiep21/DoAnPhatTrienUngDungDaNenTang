using Game.DbContexts;
using Game.Dtos.ForAdmin;
using Game.Dtos.ForAdmin.InfoFile;
using Game.Entities;
using Game.Entities.ForAdmin;
using Game.Services.ForAdmin.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;

namespace Game.Services.ForAdmin.Implements
{
    public class InfoApkService : IInfoApkFile
    {
        private readonly ApplicationDbContext _context;

        public InfoApkService(ApplicationDbContext context)
        {
            _context = context;
        }
        public void CreateInfoFile(CreateInfoFileDto input)
        {


            if (_context.InfoApkFiles.Any(b => b.TenTroChoi == input.TenTroChoi))
            {
                throw new Exception("Tên trò chơi đã có người sử dụng");
            }
            var checkNameGame = _context.ApkFiles.FirstOrDefault(c => c.FileName == input.TenTroChoi);
            if (checkNameGame == null)
            {
                throw new Exception("Tên trò chơi không trùng với tên file");
            }

            _context.InfoApkFiles.Add(new InfoApkFile
            {
                TenTroChoi = input.TenTroChoi,
                MoTaTroChoi = input.MoTaTroChoi,
                TheLoai = input.TheLoai,
                DoTuoi = input.DoTuoi,
                Gia = input.Gia,
                GioiThieuTroChoi = input.GioiThieuTroChoi,
                KichCoFile = input.KichCoFile,
                TrangThai = input.TrangThai,
                NhaCungCap = input.NhaCungCap,
            });
            _context.SaveChanges();
        }
        public List<InfoFileDto> GetInfoFile()
        {

            var infoApkFile = new List<InfoFileDto>();
            foreach (var infoApkFiles in _context.InfoApkFiles)
            {
                if (infoApkFiles.TrangThai != "Chờ xét duyệt")
                {
                    infoApkFile.Add(new InfoFileDto
                    {
                        Id = infoApkFiles.Id,
                        TenTroChoi = infoApkFiles.TenTroChoi,
                        MoTaTroChoi = infoApkFiles.MoTaTroChoi,
                        TheLoai = infoApkFiles.TheLoai,
                        DoTuoi = infoApkFiles.DoTuoi,
                        Gia = infoApkFiles.Gia,
                        TrangThai = infoApkFiles.TrangThai,
                        KichCoFile = infoApkFiles.KichCoFile,
                        GioiThieuTroChoi = infoApkFiles.GioiThieuTroChoi,
                        NhaCungCap = infoApkFiles.NhaCungCap,


                    });
                }


            }
            return infoApkFile;
        }
        public List<InfoFileDto> GetInfoFileById(int id)
        {
            var checkFileById = _context.InfoApkFiles.FirstOrDefault(s => s.Id == id);
            if (checkFileById == null)
            {
                throw new Exception($"Không có game có Id = {id}");
            }
            var infoApkFile = new List<InfoFileDto>();

            infoApkFile.Add(new InfoFileDto
            {
                Id = checkFileById.Id,
                TenTroChoi = checkFileById.TenTroChoi,
                MoTaTroChoi = checkFileById.MoTaTroChoi,
                TheLoai = checkFileById.TheLoai,
                DoTuoi = checkFileById.DoTuoi,
                Gia = checkFileById.Gia,
                TrangThai = checkFileById.TrangThai,
                KichCoFile = checkFileById.KichCoFile,
                GioiThieuTroChoi = checkFileById.GioiThieuTroChoi,
                NhaCungCap = checkFileById.NhaCungCap,


            });

            return infoApkFile;
        }
        public void DeleteInfoFile(string tenTroChoi)
        {
            var game = _context.InfoApkFiles.FirstOrDefault(i => i.TenTroChoi == tenTroChoi);

            if (game == null)
            {
                throw new Exception($"Không tìm thấy trò chơi {tenTroChoi}");
            }
            _context.Remove(game);
            _context.SaveChanges();
        }
    }
}
