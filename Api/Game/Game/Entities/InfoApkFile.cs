﻿using System.ComponentModel.DataAnnotations;

namespace Game.Entities
{
    public class InfoApkFile
    {
        [Key]
        public int Id { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Tên trò chơi không được bỏ trống")]
        public string TenTroChoi { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Mô tả trò chơi không được bỏ trống")]
        public string MoTaTroChoi { get; set; }
        public string TrangThai { get; set; }
    
        public string DoTuoi { get; set; }
        
        public string TheLoai { get; set; }
        public string Gia { get; set; }
        public string KichCoFile { get; set; }
        public string NhaCungCap { get; set; }
        public string GioiThieuTroChoi { get; set; }
        

    }
}