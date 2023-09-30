using System.ComponentModel.DataAnnotations;

namespace Game.Dtos.ApkFile
{
    public class InfoFileDto
    {

        public int Id { get; set; }
        public string TenTroChoi { get; set; }
        public string MoTaTroChoi { get; set; }
        public string TrangThai { get; set; }
        public string DoTuoi { get; set; }
        public string TheLoai { get; set; }
        public string KichCoFile { get; set; }
        public string Gia { get; set; }
        public string NhaCungCap { get; set; }
        public string GioiThieuTroChoi { get; set; }
    }
}
