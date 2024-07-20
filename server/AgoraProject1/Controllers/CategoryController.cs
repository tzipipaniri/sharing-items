using Microsoft.AspNetCore.Mvc;
using Common1.Dtos;
using Service1.Interfaces;
using Repository.Entity;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AgoraProject1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IService<CategoryDto> service;
        public CategoryController(IService<CategoryDto> service)
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
        // GET: api/<CategoryController>
        [HttpGet]
        // [Authorize]
        public async Task<List<CategoryDto>> Get()
        {
            var categories = await service.GetAllAsync();
            foreach (var category in categories)
            {
                if (category.Image != null)
                    category.Image = GetImage(category.Image);
            }
            return categories;

        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public async Task<CategoryDto> Get(int id)
        {
            return await this.service.GetAsync(id);
        }

        // POST api/<CategoryController>
        [HttpPost]
        public async Task<ActionResult> Post([FromForm] CategoryDto value)
        {
            if (value.FileImage != null)
            {
                var myPath = Path.Combine(Environment.CurrentDirectory + "/images/" + value.FileImage.FileName);
                using (FileStream fs = new FileStream(myPath, FileMode.Create))
                {
                    value.FileImage.CopyTo(fs);
                    fs.Close();
                }

                value.Image = value.FileImage.FileName;
            }
            return Ok(await service.AddAsync(value));
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromForm] CategoryDto value)
        {
            if(value.FileImage != null) {
            var myPath = Path.Combine(Environment.CurrentDirectory + "/Images/" + value.FileImage.FileName);
            Console.WriteLine("myPath: " + myPath);

            using (FileStream fs = new FileStream(myPath, FileMode.Create))
            {
                value.FileImage.CopyTo(fs);
                fs.Close();
            }
            value.Image = value.FileImage.FileName;
            }
            await service.UpdateAsync(id, value);
        }
        
        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.DeleteAsync(id);
        }
    }
}
