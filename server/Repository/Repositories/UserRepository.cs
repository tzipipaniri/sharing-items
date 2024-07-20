using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class UserRepository : ILogin
    {
        private readonly IContext _context;
        public UserRepository(IContext context)
        {
            this._context = context;
        }

        public async Task<User> AddAsync(User item)
        {
            User u = item;
            await this._context.Users.AddAsync(u);
            await this._context.save();
            return u;
        }

        public async Task DeleteAsync(int id)
        {
            _context.Users.Remove(await GetAsync(id));
            await _context.save();
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }
        
        public async Task<User> GetAsync(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
        }



        public User getCustomerByLogin(string username, string password)
        {
            User u = this._context.Users.FirstOrDefault(x => x.UserName == username && x.Password == password);
            if (u != null)
                return u;
            return null;
        }


        public async Task UpdateAsync(int id, User item)
        {
            var user =await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
                user.FirstName = item.FirstName;
                user.LastName = item.LastName;
                user.UserName = item.UserName;
                user.Password = item.Password;
                user.Email = item.Email;
                user.Phone = item.Phone;
                user.City = item.City;
                user.Street = item.Street;
                user.Area = item.Area;
            user.DateOfBirth= item.DateOfBirth;
            if (item.Image != null)
                user.Image = item.Image;
            await  _context.save();
    }
    }
}
