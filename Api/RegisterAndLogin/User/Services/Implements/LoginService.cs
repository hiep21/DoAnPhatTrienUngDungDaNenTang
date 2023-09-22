using User.DbContexts;
using User.Dtos.Login;
using User.Entities;
using User.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace User.Services.Implements
{
    public class LoginService : ILoginService
    {
        private readonly ApplicationDbContext _context;

        public LoginService(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Create(CreateLoginDto input)
        {
            if (_context.Logins.Any(b => b.KeyToken == input.KeyToken))  
            {
                throw new Exception("Tên tài khoản đã có người sử dụng");
            }
            _context.Logins.Add(new Login
            {
                KeyToken = input.KeyToken,
                User = input.User,
                Password = input.Password,
                hashedPassword = input.hashedPassword

            });
            _context.SaveChanges();
        }

        public void Update(UpdateLoginDto input)
        {
            var login = _context.Logins.FirstOrDefault(s => s.KeyToken == input.KeyToken);
            if (login == null)
            {
                throw new Exception($"Không tìm thấy tài khoản có token = {input.KeyToken}");
            }
            login.User = input.User;
            login.Password = input.Password;
            login.hashedPassword = input.hashedPassword;

            _context.SaveChanges();
        }

        public List<LoginDto> GetAll()
        {
            var results = new List<LoginDto>();
            foreach (var login in _context.Logins)
            {
                results.Add(new LoginDto
                {
                    KeyToken=login.KeyToken,
                    User = login.User,
                    hashedPassword = login.hashedPassword
                    
                });
            }
            return results;
        }
        public void Delete(string keyToken) 
        {
            var login = _context.Logins.FirstOrDefault(x => x.KeyToken == keyToken);
            if (login == null)
            {
                throw new Exception($"Không tìm thấy tài khoản có id = {keyToken}");
            }
            _context.Logins.Remove(login);
            _context.SaveChanges();
        }

    }
}
