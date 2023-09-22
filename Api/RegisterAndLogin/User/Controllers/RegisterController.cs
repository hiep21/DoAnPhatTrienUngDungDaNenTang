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
        [HttpPut("updateRegister")]
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
        [HttpGet("getByEmail")]
        public IActionResult getByEmail()
        {
            try
            {

                return Ok(_registerService.GetByEmail());
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("delete")]
        public IActionResult Delete(string keyToken) 
        {
            try
            {
                _registerService.Delete(keyToken);
                return Ok();
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deleteByEmail")]
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
