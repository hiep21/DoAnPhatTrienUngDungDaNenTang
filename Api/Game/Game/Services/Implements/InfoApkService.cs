﻿using Game.DbContexts;
using Game.Dtos.ApkFile;
using Game.Entities;
using Game.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;

namespace Game.Services.Implements
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
            if (_context.ApkFiles.Any(a => a.FileName != input.TenTroChoi))
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
                KichCoFile = "Mb",
                TrangThai = "Chờ xét duyệt",
                NhaCungCap = input.NhaCungCap,
            });
            _context.SaveChanges();
        }
        public List<InfoFileDto> GetInfoFile()
        {

            var infoApkFile = new List<InfoFileDto>();
            foreach (var infoApkFiles in _context.InfoApkFiles)
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