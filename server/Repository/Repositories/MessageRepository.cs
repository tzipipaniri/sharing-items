using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class MessageRepository : IRepository<Message>
    {
        private readonly IContext _context;
        public MessageRepository(IContext context)
        {
            _context = context;
        }
        public async Task<Message> AddAsync(Message item)
        {
            Message m = item;
            m.Date= DateTime.Now;
            await _context.Messages.AddAsync(m);
            await this._context.save();
            return m;
        }

        public async Task DeleteAsync(int id)
        {
            this._context.Messages.Remove(await GetAsync(id));
            await _context.save();
        }

        public async Task<List<Message>> GetAllAsync()
        {
            return await _context.Messages.Include(m=>m.Sender).Include(m=>m.Getting).ToListAsync();
        }

        public async Task<Message> GetAsync(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateAsync(int id, Message item)
        {
            var m = await _context.Messages.FirstOrDefaultAsync(x => x.Id == id);
            if (item.SenderId != null)
                m.SenderId = item.SenderId;
            if (item.GettingId != null)
                m.GettingId = item.GettingId;
            m.Content = item.Content;
            if(item.ItemId!=0)
                m.ItemId = item.ItemId;
            m.Date = DateTime.Now;
            await _context.save();
        }
    }
}
