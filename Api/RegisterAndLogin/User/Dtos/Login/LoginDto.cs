using System.ComponentModel.DataAnnotations;

namespace User.Dtos.Login

{
    public class LoginDto
    {
        [Key]
        [Required]
        public string KeyToken { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public string hashedPassword { get; set; }

    }
}
