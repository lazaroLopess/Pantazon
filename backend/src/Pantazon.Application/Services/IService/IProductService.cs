using Pantazon.Domain.Entities;

namespace Pantazon.Application.Services.IService
{
    public interface IProductService
    {
        Task<IEnumerable<Product>?> GetAll();
        Task<Product?> GetByName(Action<Product> action);
        Task Create();
        Task Update(Product product);
        Task Delete(Guid guid);
    }
}
