using Common1.Dtos;
using Microsoft.AspNetCore.Mvc;
using Service1.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

using MimeKit;
using MailKit.Security;
using MailKit.Net.Smtp;
using System.Net;
using System.Net.Mail;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Repository.Entity;
using MailKit.Security;


namespace AgoraProject1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
         private readonly ILoginService service;
        private IConfiguration config;

        public UserController(ILoginService service,IConfiguration configuration)
        {
            this.service= service;
            config= configuration;
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
        private async Task SendEmailToUser(string email, string code)
        {
            try
            {
                using (var client = new SmtpClient())
                {
                        client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                       await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync("agoraproject2024@gmail.com", "szuo uqhk feem muqa");//    כתובת המייל והקוד 16 ספרות   
                    var message = new MimeMessage();
                    message.From.Add(new MailboxAddress("agora", "ouragoracommunity@gmail.com"));
                    message.To.Add(MailboxAddress.Parse(email));
                    message.Subject = "enter the password to agora";
                    message.Body = new TextPart("plain")
                    {
                        Text = $"Enter the 4 digits on the site for verification: {code}"
                    };

                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }

                Console.WriteLine("Mail Sent Successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send email: {ex.Message}");
            }
        }

        private async Task<UserDto> Authenticate(string username, string Password)
        {
            return service.Login(username, Password);
        }

        private string Generate(UserDto user)
        {
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {

                new Claim(ClaimTypes.GivenName,user.UserName),
                new Claim(ClaimTypes.GivenName,user.Password),
                new Claim(ClaimTypes.GivenName,user.Phone),
                new Claim(ClaimTypes.GivenName,user.Area),
                new Claim(ClaimTypes.GivenName,user.City),
                new Claim(ClaimTypes.GivenName,user.Street),
                new Claim(ClaimTypes.GivenName,user.Image),
                new Claim(ClaimTypes.GroupSid, user.DateOfBirth.ToString("yyyy-MM-dd")),

            new Claim(ClaimTypes.Email,user.Email),
            new Claim(ClaimTypes.GivenName,user.FirstName),
            new Claim(ClaimTypes.Surname,user.LastName),
            
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), // החלף את Id עם תכונת מזהה המשתמש בפועל

            };
            var token = new JwtSecurityToken(config["Jwt:Issuer"], config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private UserDto GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var userId = identity.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
                var UserClaim = identity.Claims;
                if (userId != null)
                {
                    return new UserDto()
                    {
                        Id = int.Parse(userId),
                        FirstName = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.GivenName)?.Value,
                        Email = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value,
                        LastName = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.Surname)?.Value,
                    };
                }
            }
            return null;
        }

        [HttpPost("/login")]
        public async Task<ActionResult> Login([FromBody] UserDto customers)
        {
            UserDto c = await Authenticate(customers.UserName, customers.Password);
            if (c != null)
            {
                var token = Generate(c);
                return Ok(token);
            }
            return NotFound("user not found");

        }

        [HttpGet("user/{userName}")]
        public async Task<UserDto> GetByUserName(string userName)
        {
            var user= await service.GetUserByUserName(userName);
            user.Image = GetImage(user.Image);
            return user;
        }
        // GET: api/<UserController>
        [HttpGet]
        public async Task<List<UserDto>> Get()
        {
            var users = await service.GetAllAsync();
            return users;
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<UserDto> Get(int id)
        {
            var user = await this.service.GetAsync(id);
            if (user.Image != null)
                user.Image = GetImage(user.Image);
            return user;
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<ActionResult> Post([FromForm] UserDto user)
        {

            if (user.FileImage != null)
            {
                var myPath = Path.Combine(Environment.CurrentDirectory + "/images/" + user.FileImage.FileName);
                using (FileStream fs = new FileStream(myPath, FileMode.Create))
                {
                    user.FileImage.CopyTo(fs);
                    fs.Close();
                }

                user.Image = user.FileImage.FileName;
            }

            return Ok(await service.AddAsync(user));
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromForm] UserDto user)
        {
            if (user.FileImage!=null) { 
            var myPath = Path.Combine(Environment.CurrentDirectory + "/Images/" + user.FileImage.FileName);
            Console.WriteLine("myPath: " + myPath);

            using (FileStream fs = new FileStream(myPath, FileMode.Create))
            {
                user.FileImage.CopyTo(fs);
                fs.Close();
            }
            user.Image = user.FileImage.FileName;
            }
            await service.UpdateAsync(id, user);
        }



        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
           await service.DeleteAsync(id);
        }

        [HttpPost("ReceiveEmail")]
        public IActionResult ReceiveString([FromBody] string email)
        {
            Random rand = new Random();

            int randomNumber = rand.Next(1000, 10000);


            SendEmailToUser(email, randomNumber.ToString());
            return Ok(new { success = true, data = randomNumber.ToString() });
        }
    }
}
