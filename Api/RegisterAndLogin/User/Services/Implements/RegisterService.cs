using User.DbContexts;
using User.Dtos.Register;
using User.Entities;
using User.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace User.Services.Implements
{
    public class RegisterService:IRegisterService
    {
        private readonly ApplicationDbContext _context;

        public RegisterService(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Create(CreateRegisterDto input)
        {

            if (_context.Registers.Any(b => b.User == input.User))
            {
                throw new Exception("Tên tài khoản đã có người sử dụng");
            }
            _context.Registers.Add(new Register
            {
                User = input.User,
                Name = input.Name,
                Email = input.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(input.Password),
                Note = input.Note,
                Gender = input.Gender,
                DateOfBirth = input.DateOfBirth,
                Address = input.Address,
                Phone = input.Phone,
                Image = input.Image,
            });
            _context.SaveChanges();
        }

        public void Update(UpdateRegisterDto input)
        {
            var register = _context.Registers.FirstOrDefault(s => s.User == input.User);
            if (register == null)
            {
                throw new Exception($"Không tìm thấy tài khoản có user = {input.User}");
            }
            register.User = input.User;
            register.Name = input.Name;
            register.Email = input.Email;
            register.Password = BCrypt.Net.BCrypt.HashPassword(input.Password);
            register.Note = input.Note;
            register.Gender = input.Gender;
            register.DateOfBirth = input.DateOfBirth;
            register.Address = input.Address;
            register.Phone = input.Phone;
            register.Image = input.Image;
            _context.SaveChanges();
        }

        public List<RegisterDto> GetByUser(string user)
        {
            var register = _context.Registers.FirstOrDefault(s => s.User == user);
            if (register == null)
            {
                throw new Exception($"Không tìm thấy tài khoản có user = {user}");
            }
            var results = new List<RegisterDto>();
            foreach (var registers in _context.Registers)
            {
                
                results.Add(new RegisterDto
                {
                    User = register.User,
                    Name = register.Name,
                    Email = register.Email,
                    Password = register.Password,
                    Note = register.Note,
                    Gender = register.Gender,
                    DateOfBirth = register.DateOfBirth,
                    Address = register.Address,
                    Phone = register.Phone,
                    Image = register.Image,
                });
            
            }
            return results;
        }
        public List<RegisterDto> GetAll()
        {
            
            var results = new List<RegisterDto>();
            foreach (var registers in _context.Registers)
            {

                results.Add(new RegisterDto
                {
                    User = registers.User,
                    Email = registers.Email,
                    Password = registers.Password,
                    Note = registers.Note,
                    Gender = registers.Gender,
                    DateOfBirth = registers.DateOfBirth,
                    Image = registers.Image,
                    Phone = registers.Phone,
                    Name = registers.Name,
                    Address = registers.Address
                });

            }
            return results;
        }
        public void Delete(string user) 
        {
            var register = _context.Registers.FirstOrDefault(x => x.User == user);
            if (register == null)
            {
                throw new Exception($"Không tìm thấy tài khoản có user = {user}");
            }
            _context.Registers.Remove(register);
            _context.SaveChanges();
        }
        public void DeleteByEmail(string email)
        {
            var register = _context.Registers.FirstOrDefault(x => x.Email == email);
            if (register == null)
            {
                throw new Exception($"Không tìm thấy tài khoản có email là: {email}");
            }
            _context.Registers.Remove(register);
            _context.SaveChanges();
        }

    }
}
