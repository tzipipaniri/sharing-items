using Azure;
using Common1.Dtos;
using Microsoft.AspNetCore.Mvc;
using Repository.Entity;
using Service1.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AgoraProject1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResponseController : ControllerBase
    {
        private readonly IService<ResponseDto> service;
        public ResponseController(IService<ResponseDto>service)
        {
            this.service = service;
        }
        [HttpGet("getImage/{ImageUrl}")]
        public string GetImage(string ImageUrl)
        {
            var path = Path.Combine(Environment.CurrentDirectory, "images/", ImageUrl);
            byte[] bytes = System.IO.File.ReadAllBytes(path);
            string imageBase64 = Convert.ToBase64String(bytes);
            string image = string.Format("data:image/jpeg;base64,{0}", imageBase64);
            return image;
        }

        // GET: api/<ResponseController>
        [HttpGet]
        public async Task<List<ResponseDto>> Get()
        {

            var responses = await service.GetAllAsync();
            foreach (var response in responses)
            {
                if (response.User != null && response.User.Image != null)
                    response.User.Image = GetImage(response.User.Image);
            }
            return responses;
        }

        // GET api/<ResponseController>/5
        [HttpGet("{id}")]
        public async Task<ResponseDto> Get(int id)
        {
            var response = await service.GetAsync(id);
            if (response.User != null && response.User.Image != null)
                response.User.Image = GetImage(response.User.Image);
            return response;
        }

        // POST api/<ResponseController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ResponseDto value)
        {
            value.Content = value.Content.Replace("\r\n", "\n\\n");
            return Ok(await service.AddAsync(value));
        }

        // PUT api/<ResponseController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] ResponseDto value)
        {
            await service.UpdateAsync(id, value);
        }

        // DELETE api/<ResponseController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.DeleteAsync(id);
        }
    }
}
