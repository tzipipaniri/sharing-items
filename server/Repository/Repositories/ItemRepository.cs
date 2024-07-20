using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;


namespace Repository.Repositories
{
    public class ItemRepository : IMessage
    {
        private readonly IContext context;
        public ItemRepository(IContext context)
        {
            this.context = context;
        }

        public async Task<Item> AddAsync(Item item)
        {
            Item i = item;
            i.DateDelivery = DateTime.Now;
            await this.context.Items.AddAsync(i);
            await this.context.save();
            return i;
        }

        public async Task DeleteAsync(int id)
        {
            Item i = await GetAsync(id);

            context.Items.Remove(i);
            await context.save();
        }

        public async Task<List<Item>> GetAllAsync()
        {
            return await this.context.Items.Include(i => i.Give).Include(i=>i.Ask).Include(i=>i.category).ToListAsync();
        }
       
        public async Task<Item> GetAsync(int id)
        {
            return await this.context.Items.Include(c => c.Give).Include(i => i.Ask).Include(i => i.category)
                             .Include(i => i.Messages)
                             .ThenInclude(m => m.Sender)
                             .Include(i => i.Messages)
                             .ThenInclude(m => m.Getting)
                             .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateAsync(int id, Item item)
        {
            var item1 = await context.Items.FirstOrDefaultAsync(x => x.Id == id);
            item1.Name = item.Name;
            item1.Description = item.Description;
            if(item.Image!=null)
                item1.Image = item.Image;
            if (item.GiveId != null)
                item1.GiveId = item.GiveId;
            if (item.AskId != null)
                item1.AskId = item.AskId;
            if (item1.CategoryId != 0)
                item1.CategoryId = item.CategoryId;
            item1.state = item.state;
            item1.DateDelivery = DateTime.Now;
           await context.save();
        }

        public async Task<List<List<Message>>> GetConversationsForUser(int itemId, int userId)
        {
            var item = await GetAsync(itemId);
            var messages = item.Messages;
            var conversations = messages
                .GroupBy(m => m.GettingId == userId ? m.SenderId : m.GettingId)
                .Select(g => g.OrderBy(m => m.Id).ToList())
                .ToList();
            return conversations;
        }

        public async Task<List<Message>> GetConversationForUser(int itemId, int userId)
        {
            var item = await GetAsync(itemId);
            var messages = item.Messages;
            var conversations = messages
               .Where(x => x.SenderId == userId || x.GettingId == userId)
                .OrderBy(m => m.Id).ToList();
            return conversations;
        }
    }
}
