using System.ComponentModel.DataAnnotations;

namespace User.Dtos.Register
{
    public class CreateRegisterDto
    {
        
        [Required(AllowEmptyStrings = false, ErrorMessage = "Tên không được bỏ trống")]
        public string User { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Email không dc bỏ trống")]
        public string Email { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Password không dc bỏ trống")]
        public string Password { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Ghi chú quyền hạn")]
        public string Note { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
