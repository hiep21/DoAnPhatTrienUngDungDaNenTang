using System.ComponentModel.DataAnnotations;

namespace User.Dtos.Register

{
    public class RegisterDto
    {
        [Key]
        [Required]
        public string User { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Note { get; set; }
        public string Gender { get; set; }

        public string DateOfBirth { get; set; }

    }
}
