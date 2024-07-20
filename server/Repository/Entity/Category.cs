using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public int CategoryParentId { get; set; }
        public string? Image { get; set; }
        public virtual ICollection<Item> items { get; set; }
    }
}
