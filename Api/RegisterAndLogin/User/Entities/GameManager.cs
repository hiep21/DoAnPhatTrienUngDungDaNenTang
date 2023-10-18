using System.ComponentModel.DataAnnotations;

namespace User.Entities
{
    public class GameManager
    {
        [Key]
        public string Username { get; set; }
        public string NameGame { get; set; }
        public bool IsBuy { get; set; }
        public bool IsInstall { get; set; }
    }
}
