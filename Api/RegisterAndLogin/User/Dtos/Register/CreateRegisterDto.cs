using System.ComponentModel.DataAnnotations;

namespace User.Dtos.Register
{
    public class CreateRegisterDto
    {
        
        [Required(AllowEmptyStrings = false, ErrorMessage = "Tên tài khoản không được bỏ trống")]
        public string User { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Tên không được bỏ trống")]
        public string Name { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Email không dc bỏ trống")]
        public string Email { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Password không dc bỏ trống")]
        public string Password { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Ghi chú quyền hạn")]
        public string Note { get; set; }
        public string Gender { get; set; }
        public string DateOfBirth { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Image { get; set; }
    }
}
