using User.DbContexts;
using User.Dtos.Login;
using User.Entities;
using User.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;
using User.Dtos.Register;

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
            if (_context.Logins.Any(b => b.User == input.User))
            {
                throw new Exception("Tài khoản đã có trong base");
            }
            bool check =false;
            foreach (var item in _context.Registers)
            {
                if (item.User == input.User)
                {
                   check = true;
                }
            }
            if (!check)
            {
                throw new Exception("tài khoản chưa đăng ký");
            }

            var existingRegister = _context.Registers.FirstOrDefault(r => r.User == input.User);
            if (!BCrypt.Net.BCrypt.Verify(input.Password, existingRegister.Password))
            {
                throw new Exception("Mật khẩu không khớp với mật khẩu đã đăng ký.");
            }
            _context.Logins.Add(new Login
            {
                User = input.User,
                Email = existingRegister.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(input.Password),
            });

            _context.SaveChanges();
        }


        public void Update(UpdateLoginDto input)
        {
            var login = _context.Logins.FirstOrDefault(s => s.User == input.User);
            if (login == null)
            {
                throw new Exception($"Không tìm thấy tài khoản có token = {input.User}");
            }
            login.User = input.User;
            login.Password = BCrypt.Net.BCrypt.HashPassword(input.Password);

            _context.SaveChanges();
        }

        public List<LoginDto> GetAll()
        {
            var results = new List<LoginDto>();
            foreach (var login in _context.Logins)
            {
                results.Add(new LoginDto
                {
                    
                    User = login.User,
                    Email=login.Email,
                    Password = login.Password
                    
                });
            }
            return results;
        }
        public List<RegisterDto> GetEmail(string user)
        {
            var results = new List<RegisterDto>();
            foreach (var login in _context.Registers)
            {
                if (login.User == user)
                {
                    results.Add(new RegisterDto
                    {
                        Email = login.Email,
                        Name = login.Name,
                    });
                }
            }
            return results;
        }
        public void Delete(string user) 
        {
            var login = _context.Logins.FirstOrDefault(x => x.User == user);
            if (login == null)
            {
                throw new Exception($"Không tìm thấy tài khoản có id = {user}");
            }
            _context.Logins.Remove(login);
            _context.SaveChanges();
        }

    }
}
