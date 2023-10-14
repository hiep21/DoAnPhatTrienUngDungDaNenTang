using User.Dtos.Login;
using User.Dtos.Register;
using User.Services.Implements;

namespace User.Services.Interfaces
{
    public interface ILoginService
    {
        void Create(CreateLoginDto input);
        List<LoginDto> GetAll();
        void Update(UpdateLoginDto input);
        void Delete(string user);
        List<RegisterDto> GetEmail(string user);
    }
}
