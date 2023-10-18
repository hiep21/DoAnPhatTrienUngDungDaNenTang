using User.Dtos.Login;
using User.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using User.DbContexts;
using User.Dtos.GameManager;

namespace User.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameManagerController : ControllerBase
    {

        private readonly IGameManagerService _gameService;
        public GameManagerController(IGameManagerService gameService)
        {
            _gameService = gameService;
        }

        [HttpPost("create")]
        public IActionResult Create(CreateGameManagerDto input)
        {
            try
            {
                _gameService.Create(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("update")]
        public IActionResult Update(UpdateGameDto input)
        {
            try
            {
                _gameService.Update(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            try
            {

                return Ok(_gameService.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("delete/{User}")]
        public IActionResult Delete(string User)
        {
            try
            {
                _gameService.Delete(User);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
