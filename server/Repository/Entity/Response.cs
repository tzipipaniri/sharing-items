using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class Response
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User user { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime Date { get; set; }

    }
}
