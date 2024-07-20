using Repository.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Common1.Dtos
{
    public class UserDto
    {
        public int? Id { get; set; }
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
        public IFormFile? FileImage { get; set; }

    }
}
