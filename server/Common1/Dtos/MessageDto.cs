using Repository.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common1.Dtos
{
    public class MessageDto
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public int GettingId { get; set; }
        public string Content { get; set; }
        public int ItemId { get; set; }
        public DateTime Date { get; set; }
        public UserDto? Sender { get; set; }
        public UserDto? Getting { get; set; }
    }
}
