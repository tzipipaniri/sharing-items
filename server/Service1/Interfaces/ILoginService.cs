using Common1.Dtos;
using Repository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service1.Interfaces
{
    public interface ILoginService:IService<UserDto>
    {
        public UserDto Login(string username, string password);

        public Task<UserDto> GetUserByUserName(string userName);

    }
}
