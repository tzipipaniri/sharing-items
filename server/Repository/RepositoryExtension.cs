using Microsoft.Extensions.DependencyInjection;
using Repository.Entity;
using Repository.Interface;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public static class RepositoryExtension
    {
        public static IServiceCollection AddRepository(this IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<Category>), typeof(CategoryRepository));
            services.AddScoped(typeof(ILogin), typeof(UserRepository));
            services.AddScoped(typeof(IRepository<User>), typeof(UserRepository));
            services.AddScoped(typeof(IMessage), typeof(ItemRepository));

            services.AddScoped(typeof(IRepository<Response>), typeof(ResponseRepository));
            services.AddScoped(typeof(IRepository<Message>), typeof(MessageRepository));
            return services;
        }
    }
}
