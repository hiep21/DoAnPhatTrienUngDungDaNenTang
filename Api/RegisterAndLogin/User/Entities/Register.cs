using System.ComponentModel.DataAnnotations;

namespace User.Entities
{
    public class Register
    {
        [Key]
        [Required] 
        public string User { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
        public string DateOfBirth { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Image { get; set; }
        public string Note { get; set; }
    }
}
