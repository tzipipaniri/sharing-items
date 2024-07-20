using AutoMapper;
using Common1.Dtos;
using Microsoft.Extensions.DependencyInjection;
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
    public class MessageService : IService<MessageDto>
    {
        private readonly IRepository<Message> _repository;
        private readonly IMapper mapper;
        public MessageService(IRepository<Message>repository,IMapper mapper)
        {
            this._repository = repository;
            this.mapper = mapper;
        }
        public async Task<MessageDto> AddAsync(MessageDto service)
        {
            return mapper.Map<MessageDto>(await _repository.AddAsync(mapper.Map<Message>(service)));

        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);

        }

        public async Task<List<MessageDto>> GetAllAsync()
        {
            return mapper.Map<List<MessageDto>>(await _repository.GetAllAsync());

        }

        public async Task<MessageDto> GetAsync(int id)
        {
            return mapper.Map<MessageDto>(await _repository.GetAsync(id));

        }

        public async Task UpdateAsync(int id, MessageDto service)
        {
            await _repository.UpdateAsync(id, mapper.Map<Message>(service));

        }
    }
}
