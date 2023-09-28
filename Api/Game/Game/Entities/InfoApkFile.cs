using System.ComponentModel.DataAnnotations;

namespace Game.Entities
{
    public class InfoApkFile
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string NhaCungCap { get; set; }
        public string Description { get; set; }

    }
}
