using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Area { get; set; }
        public string? City { get; set; } 
        public string? Street { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Image { get; set; }

        [InverseProperty("Give")]
        public virtual ICollection<Item>? itemsToGive { get; set; }
        [InverseProperty("Ask")]
        public virtual ICollection<Item>? itemsToAsk { get; set; }
        public virtual ICollection<Response> responses { get; set; }

        [InverseProperty("Sender")]
        public virtual ICollection<Message>? MessagesToSend { get; set; }
        [InverseProperty("Getting")]
        public virtual ICollection<Message>? MessagesToGet { get; set; }
    }
}