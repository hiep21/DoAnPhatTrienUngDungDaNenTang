using User.Dtos.Login;
using User.Services.Implements;

namespace User.Services.Interfaces
{
    public interface ILoginService
    {
        void Create(CreateLoginDto input);
        List<LoginDto> GetAll();
        void Update(UpdateLoginDto input);
        void Delete(string user);
    }
}
