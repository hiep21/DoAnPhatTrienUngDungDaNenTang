using System.ComponentModel.DataAnnotations;

namespace Game.Dtos.Register

{
    public class ApkFileDto
    {
        public string FileName { get; set; }
        public byte[] Data { get; set; }
        public string Description { get; set; }
    }
}
