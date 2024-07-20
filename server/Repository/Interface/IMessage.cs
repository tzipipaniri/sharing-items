using Repository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interface
{
    public interface IMessage:IRepository<Item>
    {
        public Task<List<List<Message>>> GetConversationsForUser(int itemId, int userId);
        public Task<List<Message>> GetConversationForUser(int itemId, int userId);

    }
}
