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
        [Required(AllowEmptyStrings = false, ErrorMessage = "Ngày sinh không được bỏ trống")]
        public string DateOfBirth { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Địa chỉ không được bỏ trống")]
        public string Address { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Số điện thoại không được bỏ trống\r\n")]
        [MaxLength(10, ErrorMessage = "Số điện thoại không được quá 10 ký tự"), MinLength(10, ErrorMessage = "Số điện thoại tối thiểu 10 ký tự")]
        
        public string Phone { get; set; }
        public string Image { get; set; }
    }
}
