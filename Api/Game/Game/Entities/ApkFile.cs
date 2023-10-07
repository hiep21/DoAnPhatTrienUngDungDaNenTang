using System.ComponentModel.DataAnnotations;

namespace Game.Entities
{
    public class ApkFile
    {
        [Key]
        public int Id { get; set; }
        public string FileName { get; set; }
        
    }
}
