using System.ComponentModel.DataAnnotations;

namespace Game.Dtos.ForAdmin.InfoFile
{
    public class CreateInfoFileDto
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Tên trò chơi không được bỏ trống")]
        public string TenTroChoi { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Mô tả trò chơi không được bỏ trống")]
        public string MoTaTroChoi { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Độ tuổi không được bỏ trống")]
        public string DoTuoi { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Thể loại trò chơi không được bỏ trống")]
        public string TheLoai { get; set; }
        public string Gia { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Nhà cung cấp không được bỏ trống")]
        public string NhaCungCap { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Giới thiệu trò chơi không được bỏ trống"), MinLength(50, ErrorMessage = "Độ dài tối thiểu 50 ký tự")]
        public string GioiThieuTroChoi { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Kích cỡ file không được bỏ trống")]
        public string KichCoFile { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Trạng thái không được bỏ trống")]
        public string TrangThai { get; set; }
    }
}
