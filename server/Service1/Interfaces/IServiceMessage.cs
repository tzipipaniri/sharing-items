using Common1.Dtos;
using Repository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service1.Interfaces
{
    public interface IServiceMessage: IService<ItemDto>
    {
        public Task<List<List<MessageDto>>> GetConversationsForUser(int itemId, int userId);
        public Task<List<MessageDto>> GetConversationForUser(int itemId, int userId);

    }
}
