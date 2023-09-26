using System.ComponentModel.DataAnnotations;

namespace User.Entities
{
    public class Login
    {
        [Key]
        [Required] 
        public string User { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
