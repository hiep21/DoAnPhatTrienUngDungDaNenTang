using User.Dtos.Register;
using User.Services.Implements;

namespace User.Services.Interfaces
{
    public interface IRegisterService
    {
        void Create(CreateRegisterDto input);
        List<RegisterDto> GetByEmail();
        void Update(UpdateRegisterDto input);
        void Delete(string keyToken);
        void DeleteByEmail(string Email);
    }
}
