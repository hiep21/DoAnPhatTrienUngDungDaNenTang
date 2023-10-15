using User.Dtos.Register;
using User.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace User.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegisterController: ControllerBase
    {
        private readonly IRegisterService _registerService;
        public RegisterController(IRegisterService registerService)
        {
            _registerService = registerService;
        }

        [HttpPost("createRegister")]
        public IActionResult Create(CreateRegisterDto input)
        {
            try
            {
                _registerService.Create(input);
                return Ok();
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updateRegister/{User}")]
        public IActionResult Update(UpdateRegisterDto input) 
        {
            try
            {
                _registerService.Update(input);
                return Ok();
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getByUser/{user}")]
        public IActionResult GetByUser(string user)
        {
            try
            {

                return Ok(_registerService.GetByUser(user));
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_registerService.GetAll());
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
                _registerService.Delete(User);
                return Ok();
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deleteByEmail{email}")]
        public IActionResult DeleteByEmail(string email)
        {
            try
            {
                _registerService.DeleteByEmail(email);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
