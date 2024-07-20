using Common1.Dtos;
using Microsoft.Extensions.DependencyInjection;
using Repository;
using Repository.Entity;
using Service1.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service1.Services
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddRepository();
            services.AddAutoMapper(typeof(MapperProfile));
            services.AddScoped<ILoginService, UserService>();

            services.AddScoped<IServiceMessage, ItemService>();
            services.AddScoped<IService<CategoryDto>, CategoryService>();
            services.AddScoped<IService<ResponseDto>, ResponseService>();
            services.AddScoped<IService<MessageDto>, MessageService>();
            return services;
        }
    }
}
