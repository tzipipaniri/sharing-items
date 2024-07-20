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
    public class ItemService : IServiceMessage
    {
        private readonly IMessage _repository;
        private readonly IMapper _mapper;
        public ItemService(IMessage repository, IMapper mapper)
        {
            this._repository = repository;
            this._mapper = mapper;
        }

        public async Task<ItemDto> AddAsync(ItemDto service)
        {
            return _mapper.Map<ItemDto>(await _repository.AddAsync(_mapper.Map<Item>(service)));
        }

        public async Task DeleteAsync(int id)
        {
             await _repository.DeleteAsync(id);
        }

        public async Task<List<ItemDto>> GetAllAsync()
        {
            return _mapper.Map<List<ItemDto>>(await _repository.GetAllAsync());
        }

        public async Task<ItemDto> GetAsync(int id)
        {
                return _mapper.Map<ItemDto>(await _repository.GetAsync(id));
        }

        public async Task<List<MessageDto>> GetConversationForUser(int itemId, int userId)
        {
            return _mapper.Map<List<MessageDto>>(await _repository.GetConversationForUser(itemId,userId));

        }

        public async Task<List<List<MessageDto>>> GetConversationsForUser(int itemId, int userId)
        {
            return _mapper.Map<List<List<MessageDto>>>(await _repository.GetConversationsForUser(itemId,userId));

        }
        public async Task UpdateAsync(int id, ItemDto service)
        {
              await _repository.UpdateAsync(id,_mapper.Map<Item>(service));
        }

    }
}
