using System.ComponentModel.DataAnnotations;

namespace User.Entities
{
    public class ImageIcon
    {
        [Key]
        public string ImageName { get; set; }
        public string ImagePath { get; set; }
        public string OldFileName { get; set; }
    }
}
