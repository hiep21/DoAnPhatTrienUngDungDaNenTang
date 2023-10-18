using User.Dtos.GameManager;
using User.Dtos.Register;

namespace User.Services.Interfaces
{
    public interface IGameManagerService
    {
        void Create(CreateGameManagerDto input);
        List<GameManagerDto> GetByUser(string username);
        List<GameManagerDto> GetAll();
        void Update(UpdateGameDto input);
        void Delete(string user);
    }
}
