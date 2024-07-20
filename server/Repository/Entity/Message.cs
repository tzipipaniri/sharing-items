using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class Message
    {
        public int Id { get; set; }
        public int? SenderId { get; set; }
        [ForeignKey("SenderId")]
        public virtual User? Sender { get; set; }
        public int? GettingId { get; set; }
        [ForeignKey("GettingId")]
        public virtual User Getting { get; set; }
        public string Content { get; set; }
        public int ItemId { get; set; }
        [ForeignKey("ItemId")]
        public virtual Item Item { get; set; }
        public DateTime Date { get; set; }
    }
}
