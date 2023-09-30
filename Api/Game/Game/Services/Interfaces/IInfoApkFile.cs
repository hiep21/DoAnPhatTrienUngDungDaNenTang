using Game.Dtos.ApkFile;
using Game.Dtos.Register;

namespace Game.Services.Interfaces
{
    public interface IInfoApkFile
    {
        void CreateInfoFile(CreateInfoFileDto input);
        void DeleteInfoFile(string tenTroChoi);
        List<InfoFileDto> GetInfoFile();
    }
}
