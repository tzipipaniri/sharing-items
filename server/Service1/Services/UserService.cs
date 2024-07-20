using AutoMapper;
using Common1.Dtos;
using Repository.Entity;
using Repository.Interface;
using Service1.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service1.Services
{
    public class UserService : ILoginService
    {
        private readonly ILogin _repository;
        private readonly IMapper mapper;
        public UserService(ILogin repository,IMapper mapper)
        {
            this._repository = repository;
            this.mapper = mapper;
        }
       
        public async Task DeleteAsync(int id)
        {
                await _repository.DeleteAsync(id);
        }

        public async Task<List<UserDto>> GetAllAsync()
        {
               return mapper.Map<List<UserDto>>(await _repository.GetAllAsync());
        }

        public async Task<UserDto> GetAsync(int id)
        {
             return mapper.Map<UserDto>(await _repository.GetAsync(id));
        }

        public async Task<UserDto> GetUserByUserName(string userName)
        {
             var lst = await this._repository.GetAllAsync();
            foreach (var item in lst)
            {
                if (item.UserName == userName)
                {
                    return mapper.Map<UserDto>(item);
                }
            }
            throw new Exception();
        }

      
        public async Task UpdateAsync(int id, UserDto service)
        {
             await  _repository.UpdateAsync(id,mapper.Map<User>(service));
        }
        public UserDto Login(string username, string password)
        {
            return mapper.Map<UserDto>(_repository.getCustomerByLogin(username, password));
        }

        public async Task<UserDto> AddAsync(UserDto user)
        {
            return mapper.Map<UserDto>(await _repository.AddAsync(mapper.Map<User>(user)));
        }
    }
}
