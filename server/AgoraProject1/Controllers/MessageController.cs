using Common1.Dtos;
using Microsoft.AspNetCore.Mvc;
using Repository.Entity;
using Service1.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AgoraProject1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IService<MessageDto> _service;
        public MessageController(IService<MessageDto>service)
        {
            _service = service;
        }
        // GET: api/<MessageController>
        [HttpGet]
        public async Task<List<MessageDto>> Get()
        {
            return await _service.GetAllAsync();
        }

        // GET api/<MessageController>/5
        [HttpGet("{id}")]
        public async Task<MessageDto> Get(int id)
        {
            return await this._service.GetAsync(id);
        }

        // POST api/<MessageController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] MessageDto value)
        {
            return Ok(await _service.AddAsync(value));
        }

        // PUT api/<MessageController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] MessageDto value)
        {
            await _service.UpdateAsync(id, value);
        }

        // DELETE api/<MessageController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.DeleteAsync(id);
        }
    }
}
