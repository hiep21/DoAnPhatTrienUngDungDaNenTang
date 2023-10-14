
using Game.Dtos.ForAdmin.InfoFile;


namespace Game.Services.ForAdmin.Interfaces
{
    public interface IInfoApkFile
    {
        void CreateInfoFile(CreateInfoFileDto input);
        void DeleteInfoFile(string tenTroChoi);
        List<InfoFileDto> GetInfoFile();
        List<InfoFileDto> GetInfoFileById(int id);
    }
}
