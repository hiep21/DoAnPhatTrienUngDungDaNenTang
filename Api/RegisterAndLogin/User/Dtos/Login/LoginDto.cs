using System.ComponentModel.DataAnnotations;

namespace User.Dtos.Login

{
    public class LoginDto
    {
        [Key]
        [Required]
        public string User { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

    }
}
