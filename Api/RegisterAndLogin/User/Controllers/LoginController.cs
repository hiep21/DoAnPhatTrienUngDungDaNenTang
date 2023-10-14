﻿using User.Dtos.Login;
using User.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using User.DbContexts;

namespace User.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController: ControllerBase
    {
       
        private readonly ILoginService _loginService;
        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost("createLogin")]
        public IActionResult Create(CreateLoginDto input)
        {
            try
            {
                _loginService.Create(input);
                return Ok(_loginService.GetEmail(input.User)[0]);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updateLogin")]
        public IActionResult Update(UpdateLoginDto input) 
        {
            try
            {
                _loginService.Update(input);
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

                return Ok(_loginService.GetAll());
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
                _loginService.Delete(User);
                return Ok();
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
