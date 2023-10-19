using System.ComponentModel.DataAnnotations;

namespace Game.Entities.ForAdmin
{
    public class ImageFile
    {
        [Key]
        public string ImageName { get; set; }
        public string ImagePath { get; set; }
        public string OldFileName { get; set; }
    }
}
