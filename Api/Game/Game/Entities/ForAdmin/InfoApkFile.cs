using System.ComponentModel.DataAnnotations;

namespace Game.Entities.ForAdmin
{
    public class InfoApkFile
    {
        [Key]
        public int Id { get; set; }
        public string TenTroChoi { get; set; }

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
