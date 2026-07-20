using Pantazon.Domain.Entities;

namespace Pantazon.Application.CatalogContracts;
public sealed class HomeResponse
{
    public IReadOnlyList<Category> Categories { get; set; } = [];
    public IReadOnlyList<Product> Products { get; set; } = [];
}

public class ProductSearchRequest
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}

public struct CreateProductResponse
{
    public string Message { get; private set; }
    public bool Created { get; private set; }
    public CreateProductResponse(bool created, string message)
    {
        Message = message;
        Created = created;
    }
}

public sealed class CreateProductRequest
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Slug { get; set; }
    public required string Description { get; set; }
    public required Guid CategoryId {  get; set; }
    public IReadOnlyList<ProductVariantInput> Variants { get; set; } = [];
}

public sealed class ProductVariantInput
{
    public required string Sku { get; set; }
    public required Guid ProductId { get; set; }
    public required decimal Price { get; set; }
}
public sealed class UpdateProductRequest
{
    public required string Name { get; set; }

    public required string Slug { get; set; }

    public string? Description { get; set; }

    public required Guid CategoryId { get; set; }
}

public sealed class PatchProductRequest
{
    public string? Name { get; set; }

    public string? Slug { get; set; }

    public string? Description { get; set; }

    public Guid? CategoryId { get; set; }
}

public sealed class ProductImageInput
{
    public required string Url { get; set; }

    public string? AltText { get; set; }

    public int DisplayOrder { get; set; }
}

public sealed class ProductImageResponse
{
    public required Guid Id { get; init; }

    public required Guid ProductId { get; init; }

    public required string Url { get; init; }

    public string? AltText { get; init; }

    public required int DisplayOrder { get; init; }
}

public sealed class ProductVariantResponse
{
    public required Guid Id { get; init; }

    public required Guid ProductId { get; init; }

    public required string Sku { get; init; }

    public required decimal Price { get; init; }
}

public sealed class CreateCategoryRequest
{
    public required string Name { get; set; }

    public required string Slug { get; set; }
}

public class CategoryResponse
{
    public required Guid Id { get; init; }

    public required string Name { get; init; }

    public required string Slug { get; init; }

    public required bool IsActive { get; init; }
}

public sealed class CreateCategoryResponse : CategoryResponse
{
}
public interface ICatalogService
{
    Task<HomeResponse> GetHomeAsync();

    Task<IReadOnlyList<Product>> GetStoreProductsAsync(
        ProductSearchRequest request);

    Task<ProductVariant?> GetBySkuAsync(string sku);

    Task<CreateProductResponse> CreateProductAsync(
        CreateProductRequest request);

    Task<Product> UpdateProductAsync(
        Guid id,
        UpdateProductRequest request);

    Task<Product> PatchProductAsync(
        Guid id,
        PatchProductRequest request);

    Task<ProductImageResponse> AddImageAsync(
        Guid id,
        ProductImageInput request);

    Task<ProductVariantResponse> AddVariantAsync(
        Guid id,
        ProductVariantInput request);

    Task<ProductVariantResponse> UpdateVariantAsync(
        Guid id,
        Guid variantId,
        ProductVariantInput request);

    Task<CategoryResponse> GetCategoryAsync(Guid id);

    Task<CategoryResponse> CreateCategoryAsync(
        CreateCategoryRequest request);

    Task<CategoryResponse> UpdateCategoryAsync(
        Guid id,
        CreateCategoryRequest request);
}
