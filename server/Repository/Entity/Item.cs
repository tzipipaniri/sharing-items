using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public enum State{
            rawMaterialAndAbove = 1,
            slightlyDamagedAndUp ,
                goodAndAbove, 
                likeNew 
        };
    public class Item
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public int? GiveId { get; set; }
        [ForeignKey("GiveId")]
        public virtual User? Give { get; set; }
        public int? AskId { get; set; }
        [ForeignKey("AskId")]
        public virtual User? Ask { get; set; }
        //public int? SubCategoryId { get; set; }
        //[ForeignKey("SubCategoryId")]
        //public virtual SubCategory subCategory { get; set; }
        public int? CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public virtual Category category { get; set; }
        public State state { get; set; }
        public DateTime DateDelivery { get; set; }
        public virtual ICollection<Message> Messages { get; set; }

    }
}
