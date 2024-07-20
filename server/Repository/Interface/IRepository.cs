using Repository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interface
{
    public interface IRepository<T> where T : class
    {
        public Task<T> AddAsync(T item);
        public Task UpdateAsync(int id, T item);
        public Task DeleteAsync(int id);
        public Task<T> GetAsync(int id);
        public Task<List<T>> GetAllAsync();

    }
}
