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
    internal class CategoryRepository : IRepository<Category>
    {
        private readonly IContext _context;
        public CategoryRepository(IContext context)
        {
            _context = context;
        }
        public async Task<Category> AddAsync(Category item)
        {
            Category c = item;
            await _context.Categories.AddAsync(c);
            await this._context.save();
            return c;
        }

        public async Task DeleteAsync(int id)
        {
            this._context.Categories.Remove(await GetAsync(id));
            await _context.save();
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category> GetAsync(int id)
        {
            return await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateAsync(int id, Category item)
        {
            var category = await this._context.Categories.FirstOrDefaultAsync(x => x.Id == id);
            category.Name = item.Name;
            category.CategoryParentId = item.CategoryParentId;
                category.Image = item.Image;
            await this._context.save();
        }
    }
}
