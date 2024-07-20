using Repository.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common1.Dtos
{
    public class ResponseDto
    {
        public int? Id { get; set; }
        public int? UserId { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime Date { get; set; }
        public UserDto? User { get; set; }
    }
}
