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
    public class ResponseService : IService<ResponseDto>
    {
        private readonly IRepository<Response> _repository;
        private readonly IMapper mapper;
        public ResponseService(IRepository<Response> repository, IMapper mapper)
        {
            this._repository = repository;
            this.mapper = mapper;
        }
        public async Task<ResponseDto> AddAsync(ResponseDto service)
        {
            return mapper.Map<ResponseDto>(await _repository.AddAsync(mapper.Map<Response>(service)));
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<List<ResponseDto>> GetAllAsync()
        {
            return mapper.Map<List<ResponseDto>>(await _repository.GetAllAsync());
        }

        public async Task<ResponseDto> GetAsync(int id)
        {
            return mapper.Map<ResponseDto>(await _repository.GetAsync(id));
        }

        public async Task UpdateAsync(int id, ResponseDto service)
        {
            await _repository.UpdateAsync(id, mapper.Map<Response>(service));
        }
    }
}
