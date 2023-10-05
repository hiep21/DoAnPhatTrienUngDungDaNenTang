using System.ComponentModel.DataAnnotations;

namespace Game.Entities
{
    public class ImageModel
    {
        [Key]
        public string ImageData { get; set; }
        public string FileName { get; set; }
    }
}