using System.ComponentModel.DataAnnotations;

namespace User.Dtos.GameManager
{
    public class CreateGameManagerDto
    {
        [Key]
        [Required(AllowEmptyStrings = false, ErrorMessage = "Tên tài khoản không được bỏ trống")]
        public string Username { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Tên game không được bỏ trống")]
        public string NameGame { get; set; }
        public bool IsBuy { get; set; }
        public bool IsInstall { get; set; }
    }
}
