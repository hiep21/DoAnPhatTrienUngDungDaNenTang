using System.ComponentModel.DataAnnotations;

namespace User.Entities
{
    public class Register
    {
        [Key]
        [Required] 
        public string User { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Note { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
