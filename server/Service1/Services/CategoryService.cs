using AutoMapper;
using Common1.Dtos;
using Repository.Entity;
using Repository.Interface;
using Service1.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service1.Services
{
    internal class CategoryService : IService<CategoryDto>
    {
        private readonly IRepository<Category> _repository;
        private readonly IMapper mapper;
        public CategoryService(IRepository<Category> repository, IMapper mapper)
        {
            this._repository = repository;
            this.mapper = mapper;
        }
        public async Task<CategoryDto> AddAsync(CategoryDto service)
        {
            return mapper.Map<CategoryDto>(await _repository.AddAsync(mapper.Map<Category>(service)));
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<List<CategoryDto>> GetAllAsync()
        {
            return mapper.Map<List<CategoryDto>>(await _repository.GetAllAsync());
        }

        public async Task<CategoryDto> GetAsync(int id)
        {
            return mapper.Map<CategoryDto>(await _repository.GetAsync(id));
        }

        public async Task UpdateAsync(int id, CategoryDto service)
        {
            await _repository.UpdateAsync(id, mapper.Map<Category>(service));
        }
    }
}
