using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class ResponseRepository : IRepository<Response>
    {
        private readonly IContext _context;
        public ResponseRepository(IContext context)
        {
            _context = context;
        }

        public async Task<Response> AddAsync(Response item)
        {
            Response r = item;
            r.Date= DateTime.Now;
            await _context.Responses.AddAsync(r);
            await this._context.save();
            return r;
        }

        public async Task DeleteAsync(int id)
        {
            this._context.Responses.Remove(await GetAsync(id));
            await _context.save();
        }

        public async Task<List<Response>> GetAllAsync()
        {
            return await _context.Responses.Include(r=>r.user).ToListAsync();
        }

        public async Task<Response> GetAsync(int id)
        {

            return await _context.Responses.Include(r => r.user).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateAsync(int id, Response item)
        {
        var r = await this._context.Responses.FirstOrDefaultAsync(x => x.Id == id);
            if (item.UserId != null)
                r.UserId = item.UserId;
            Console.WriteLine("title",item.Title);
            Console.WriteLine("content",item.Content);
            r.Title = item.Title;
            r.Content = item.Content;
            r.Date = DateTime.Now;
          await  this._context.save();
        }
    }
}
