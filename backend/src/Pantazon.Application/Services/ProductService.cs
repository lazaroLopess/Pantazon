
using Microsoft.EntityFrameworkCore;
using Pantazon.Application.Services.IService;
using Pantazon.Domain.Entities;
using Pantazon.Infrastructure.Data;

namespace Pantazon.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _db;
        public ProductService(ApplicationDbContext db)
        {
            _db = db;
        }
        public async Task<IEnumerable<Product>?> GetAll()
        {
            return await _db.Products.AsNoTracking().ToListAsync();
        }

        public Task<Product?> GetByName(Action<Product> action)
        {
            throw new NotImplementedException();
        }
        public Task Create()
        {
            throw new NotImplementedException();
        }
        public Task Update(Product product)
        {
            throw new NotImplementedException();
        }
        public Task Delete(Guid guid)
        {
            throw new NotImplementedException();
        }
    }
}
