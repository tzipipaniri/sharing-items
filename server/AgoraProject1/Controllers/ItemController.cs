using Common1.Dtos;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using MimeKit;
using Repository.Entity;
using Service1.Interfaces;
using System.Globalization;
using System.Reflection;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AgoraProject1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IServiceMessage service;
        public ItemController(IServiceMessage service)
        {
            this.service = service;
        }
        // GET: api/<ItemController>
        [HttpGet]
        public async Task<List<ItemDto>> Get()
        {
            var items = await service.GetAllAsync();
            foreach (var item in items)
            {
                if (item.Image != null)
                    item.Image = GetImage(item.Image);
            }
            return items;
        }

        // GET api/<ItemController>/5
        [HttpGet("{id}")]
        public async Task<ItemDto> Get(int id)
        {
                 var item= await this.service.GetAsync(id);
            if (item.Image != null)
                item.Image = GetImage(item.Image);
            return item;
        }

        // POST api/<ItemController>
        [HttpGet("getImage/{ImageUrl}")]
        public string GetImage(string ImageUrl)
        {
            var path = Path.Combine(Environment.CurrentDirectory, "images/", ImageUrl);
            byte[] bytes = System.IO.File.ReadAllBytes(path);
            string imageBase64 = Convert.ToBase64String(bytes);
            string image = string.Format("data:image/jpeg;base64,{0}", imageBase64);
            return image;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] ItemDto value)
        {
            value.Description = value.Description.Replace("\r\n", "\n");
            Console.WriteLine(value.Description);
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


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromForm] ItemDto value)
        {
            value.Description = value.Description.Replace("\r\n", "<br/>");

            if (value.FileImage != null)
            {
                var myPath = Path.Combine(Environment.CurrentDirectory + "/Images/" + value.FileImage.FileName);
                Console.WriteLine("myPath: " + myPath);
                using (FileStream fs = new FileStream(myPath, FileMode.Create))
                {
                    value.FileImage.CopyTo(fs);
                    fs.Close();
                }
                value.Image = value.FileImage.FileName;
                Console.WriteLine("image");
            }
            else
            {
                Console.WriteLine("no image");
            }
            await service.UpdateAsync(id, value);
            return Ok();
        }

        private async Task SendEmailToUser(string Email, ItemDto m)
        {
            try
            {

                using (var client = new SmtpClient())
                {
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                    await client.ConnectAsync("Smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync("agoraproject2024@gmail.com", "szuo uqhk feem muqa");//    כתובת המייל והקוד 16 ספרות   


                    var message = new MimeMessage();
                    message.From.Add(new MailboxAddress("פרויקט אגורה-חפצים חינם בפריסה עולמית עם כל סוגי החפצים!", "ouragoracommunity@gmail.com"));
                    message.To.Add(MailboxAddress.Parse(Email));
                    message.Subject = "החפץ נימחק";


                    string name = "";
                    if (m.Ask != null)
                        name = m.Ask.FirstName;
                    else
                        name = m.Give.FirstName;

                    message.Body = new TextPart("plain ")
                    {

                        Text = $"enter this 4 digits on the site for verification:{m.Name} +{m.Description}+{name}"
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
        private async Task SendEmail(string to, string name, string htmlBody, string Subject)
        {

            var email = new MimeMessage();
            email.From.Add(new MailboxAddress("Agora project - free objects in a global layout with all types of objects!", "ouragoracommunity@gmail.com"));

            email.To.Add(new MailboxAddress(name, to));

            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = htmlBody;

            email.Body = bodyBuilder.ToMessageBody();
            email.Subject = Subject;

            using (var s = new MailKit.Net.Smtp.SmtpClient())
            {
                s.ServerCertificateValidationCallback = (s, c, h, e) => true;

                s.CheckCertificateRevocation = false;
                await s.ConnectAsync("smtp.gmail.com", 587, false);
                await s.AuthenticateAsync("agoraproject2024@gmail.com", "szuo uqhk feem muqa");//    כתובת המייל והקוד 16 ספרות   
                await s.SendAsync(email);
                await s.DisconnectAsync(true);
            }
        }

        private string readData(string urlPage)
        {
            string codeBase = Assembly.GetExecutingAssembly().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);
            string pat = Path.GetDirectoryName(Uri.UnescapeDataString(uri.Path));
            string full = Path.Combine(pat, urlPage);
            string htmlBody = "";
            using (var reader = new StreamReader(full))
            {
                htmlBody = reader.ReadToEnd();
            }
    ;
            return htmlBody;

        }

        private async Task funSimpleSendMail(string email,ItemDto item,string firstName)
        {
            string name = item.Name;
            string htmlBody = readData("html/htmlpage.html");
            htmlBody = htmlBody.Replace("{body}", name);
            htmlBody = htmlBody.Replace("{firstName}", firstName);
            htmlBody = htmlBody.Replace("{name}", item.Name);
            htmlBody = htmlBody.Replace("{description}", item.Description);
            await SendEmail(email, firstName, htmlBody, $"{item.Name} delivered/received");
        }

        // DELETE api/<ItemController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            ItemDto item=await service.GetAsync(id);
            HashSet<(string Email, string FirstName)> uniqueUsers = new HashSet<(string Email, string FirstName)>();

            foreach (var message in item.Messages)
            {
                string senderEmail = message.Sender.Email;
                string senderFirstName = message.Sender.FirstName;
                string recipientEmail = message.Getting.Email;
                string recipientFirstName = message.Getting.FirstName;

                uniqueUsers.Add((senderEmail, senderFirstName));
                uniqueUsers.Add((recipientEmail, recipientFirstName));
            }
            if(item.Give!=null)
            uniqueUsers.Add((item.Give.Email, item.Give.FirstName));
            else
                uniqueUsers.Add((item.Ask.Email, item.Ask.FirstName));

            foreach (var user in uniqueUsers)
            {
                Console.WriteLine($"{user.Email} {user.FirstName}");
               await funSimpleSendMail(user.Email, item, user.FirstName);
            }

            await service.DeleteAsync(id);
            
        }

        [HttpGet("GetItemsGiveOfUser/{giveId}")]
        public async Task<IActionResult> GetItemsGiveOfUser(int giveId)
        {

            List<ItemDto> allItems = await service.GetAllAsync();
            foreach (var item in allItems)
            {
                if (item.Image != null)
                    item.Image = GetImage(item.Image);
            }
            var giveItems = allItems.Where(x => x.GiveId!=null&&x.GiveId == giveId);
            return Ok(new { success = true, data = giveItems });
        }
        [HttpGet("GetItemsAskOfUser/{askId}")]
        public async Task<IActionResult> GetItemsAskOfUser(int askId)
        {
            List<ItemDto> allItems = await service.GetAllAsync();
            foreach (var item in allItems)
            {
                if (item.Image != null)
                    item.Image = GetImage(item.Image);
            }
            var askItems = allItems.Where(x => x.AskId != null && x.AskId == askId);
           
            return Ok(new { success = true, data = askItems });
        }
        [HttpGet("{itemId}/{userId}")]
        public async Task<List<List<MessageDto>>> GetConversationsForUser(int itemId, int userId)
        {
            var conversations= await service.GetConversationsForUser(itemId, userId);
            foreach (var conversation in conversations)
            {
                if(conversation.Count>0)
                conversation[0].Sender.Image = GetImage(conversation[0].Sender.Image);
            }
            return conversations;
        }
        [HttpGet("{itemId}/{userId}/{temp}")]
        public async Task<List<MessageDto>> GetConversationForUser(int itemId, int userId)
        {
            var conversation= await service.GetConversationForUser(itemId, userId);
            if(conversation.Count>0)
            conversation[0].Getting.Image = GetImage(conversation[0].Getting.Image);
            return conversation;
        }
    }
}
