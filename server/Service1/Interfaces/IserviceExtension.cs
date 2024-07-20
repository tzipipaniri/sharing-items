using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service1.Interfaces
{
    public interface IServicesExtention<T> : IService<T> where T : class
    {   
        public Task<T> GetUserByUserName(string userName);
    }
}
