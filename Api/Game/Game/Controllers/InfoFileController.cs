using Game.Dtos.ApkFile;
using Game.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Game.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InfoFileController : ControllerBase
    {
        private readonly IInfoApkFile _infoApkFileService;

        public InfoFileController(IInfoApkFile infoApkFileService)
        {
            _infoApkFileService = infoApkFileService;
        }

        [HttpPost("createInfoFile")]
        public IActionResult Create(CreateInfoFileDto input)
        {
            try
            {
                _infoApkFileService.CreateInfoFile(input);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getInfoFile")]
        public IActionResult GetInfoFile()
        {
            try
            {

                return Ok(_infoApkFileService.GetInfoFile());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getInfoFileById/{id}")]
        public IActionResult GetInfoFileById(int id)
        {
            try
            {

                return Ok(_infoApkFileService.GetInfoFileById(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deleteInfoFile/{tenTroChoi}")]
        public IActionResult DeleteInfoFile(string tenTroChoi)
        {
            try
            {
                _infoApkFileService.DeleteInfoFile(tenTroChoi);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
