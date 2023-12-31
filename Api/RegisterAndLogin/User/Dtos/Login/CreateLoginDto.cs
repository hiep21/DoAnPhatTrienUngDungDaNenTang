﻿using System.ComponentModel.DataAnnotations;

namespace User.Dtos.Login
{
    public class CreateLoginDto
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Key Token không được bỏ trống")]
        public string KeyToken { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Tên không được bỏ trống")]
        public string User { get; set; }

        [MinLength(6, ErrorMessage ="độ dài tối thiểu từ 6 trở lên")]
        public string Password { get; set; }

        [MinLength(6, ErrorMessage = "độ dài tối thiểu từ 6 trở lên")]
        public string hashedPassword { get; set; }
    }
}
