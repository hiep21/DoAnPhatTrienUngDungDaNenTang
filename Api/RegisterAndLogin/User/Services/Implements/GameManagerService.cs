using User.DbContexts;
using User.Dtos.GameManager;
using User.Dtos.Register;
using User.Entities;
using User.Services.Interfaces;

namespace User.Services.Implements
{
    public class GameManagerService : IGameManagerService
    {
        private readonly ApplicationDbContext _context;

        public GameManagerService(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Create(CreateGameManagerDto input)
        {
            if (_context.Registers.FirstOrDefault(b => b.User == input.Username) == null)
            {
                throw new Exception("Tài khoản không tồn tại");
            }
            
            if (_context.GameManagers.Any(b => b.Username == input.Username))
            {
                if (_context.GameManagers.Any(f => f.NameGame == input.NameGame))
                {
                    throw new Exception("Tài khoản đã có Game");
                }
            }
            
            _context.GameManagers.Add(new GameManager
            {
                Username = input.Username,
                NameGame = input.NameGame,
                IsBuy = input.IsBuy,
                IsInstall = input.IsInstall,
            });
            _context.SaveChanges();
        }

        public void Update(UpdateGameDto input)
        {
            var gameManager = _context.GameManagers.FirstOrDefault(s => s.Username == input.Username);
            if (gameManager == null)
            {
                throw new Exception($"Không tìm thấy tài khoản có user = {input.Username}");
            }

            gameManager.Username = input.Username;
            gameManager.NameGame = input.NameGame; 
            gameManager.IsBuy = input.IsBuy;
            gameManager.IsInstall = input.IsInstall;
            

            _context.SaveChanges();
        }

        public List<GameManagerDto> GetByUser(string username)
        {
            var gameManager = _context.GameManagers.FirstOrDefault(s => s.Username == username);
            if (gameManager == null)
            {
                throw new Exception($"Không tìm thấy tài khoản có user = {username}");
            }
            var results = new List<GameManagerDto>();
            foreach (var game in _context.GameManagers)
            {

                results.Add(new GameManagerDto
                {
                    Username=game.Username,
                    NameGame=game.NameGame,
                    IsBuy = game.IsBuy,
                    IsInstall = game.IsInstall,
                });

            }
            return results;
        }
        public List<GameManagerDto> GetAll()
        {

            var results = new List<GameManagerDto>();
            foreach (var game in _context.GameManagers)
            {

                results.Add(new GameManagerDto
                {
                    Username = game.Username,
                    NameGame=game.NameGame,
                    IsBuy = game.IsBuy,
                    IsInstall = game.IsInstall,
                });

            }
            return results;
        }
        public void Delete(string username)
        {
            var game = _context.GameManagers.FirstOrDefault(x => x.Username == username);
            if (game == null)
            {
                throw new Exception($"Không tìm thấy tài khoản có user = {username}");
            }
            _context.GameManagers.Remove(game);
            _context.SaveChanges();
        }
       
    }
}
