using User.Dtos.Register;
using User.Services.Implements;

namespace User.Services.Interfaces
{
    public interface IRegisterService
    {
        void Create(CreateRegisterDto input);
        List<RegisterDto> GetByUser(string user);
        List<RegisterDto> GetAll();
        void Update(UpdateRegisterDto input);
        void Delete(string user);
        void DeleteByEmail(string Email);
    }
}
