using System.ComponentModel.DataAnnotations;

namespace User.Entities
{
    public class Login
    {
        [Key]
        [Required] 
        public string KeyToken { get; set; }
        public string User { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string hashedPassword { get; set; }
    }
}
