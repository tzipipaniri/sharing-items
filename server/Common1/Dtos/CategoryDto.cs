using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class CategoryDto
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public int? CategoryParentId { get; set; }
        public string? Image { get; set; }
        public IFormFile? FileImage { get; set; }
    }
}
