using Microsoft.EntityFrameworkCore;
using Pantazon.Application.CatalogContracts;
using Pantazon.Domain.Entities;
using Pantazon.Infrastructure.Data;

namespace Pantazon.Infrastructure.Services
{
    public class CatalogService(ApplicationDbContext db) : ICatalogService
    {
        public async Task<HomeResponse> GetHomeAsync()
        {
            var categories = await GetCategoriesAsync();
            var products = await GetProductsAsync(new() { PageSize=10, PageNumber=1});
            return new()
            {
                Categories = categories,
                Products = products
            };
        }
        public async Task<IReadOnlyList<Product>> GetStoreProductsAsync(ProductSearchRequest request)
        {
            return await GetProductsAsync(request);
        }
        public async Task<ProductVariant?> GetBySkuAsync(string sku) => await GetProductAsyncBySku(sku);
        public async Task<CreateProductResponse> CreateProductAsync(CreateProductRequest request)
        {
            if (!await db.Categories.AnyAsync(c => c.Id == request.CategoryId)) return new(false, "Categoria inválida");
            if (request.Variants.Count == 0) return new(false, "Pelo menos uma variante é necessária");
            var product = new Product (request.Name, request.Slug, request.Description, request.CategoryId);
            foreach(var variant in request.Variants)
            {
                product.Variants.Add(ToVariant(variant));
            }
            await db.Products.AddAsync(product); await SaveChangesAsync();
            return new(true, "product created successfully");
        }


        private async Task<IReadOnlyList<Category>> GetCategoriesAsync()
        {
            var query = db.Categories.Where(category => category.IsActive);
            return await query
                .OrderBy(category => category.Name)
                .ToListAsync();
        }
        private async Task<IReadOnlyList<Product>> GetProductsAsync(
    ProductSearchRequest request)
        {
            return await db.Products
                .AsNoTracking()
                .Where(product => product.IsActive)
                .Include(product => product.Category)
                .Include(product => product.Variants)
                .OrderBy(product => product.Name)
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();
        }
        public async Task<Product> UpdateProductAsync(
    Guid id,
    UpdateProductRequest request)
        {
            var product = await GetRequiredProductAsync(id);

            await EnsureCategoryExistsAsync(request.CategoryId);
            await EnsureProductSlugIsUniqueAsync(request.Slug, id);

            product.Update(
                request.Name,
                request.Slug,
                request.Description,
                request.CategoryId);

            await SaveChangesAsync();

            return product;
        }

        public async Task<Product> PatchProductAsync(
            Guid id,
            PatchProductRequest request)
        {
            var product = await GetRequiredProductAsync(id);

            var name = request.Name ?? product.Name;
            var slug = request.Slug ?? product.Slug;
            var description = request.Description ?? product.Description;
            var categoryId = request.CategoryId ?? product.CategoryId;

            await EnsureCategoryExistsAsync(categoryId);
            await EnsureProductSlugIsUniqueAsync(slug, id);

            product.Update(
                name,
                slug,
                description,
                categoryId);

            await SaveChangesAsync();

            return product;
        }

        public async Task<ProductImageResponse> AddImageAsync(
            Guid id,
            ProductImageInput request)
        {
            var product = await GetRequiredProductAsync(id);

            var image = new ProductImage(
                product.Id,
                request.Url,
                request.AltText,
                request.DisplayOrder);

            product.Images.Add(image);

            await SaveChangesAsync();

            return ToImageResponse(image);
        }

        public async Task<ProductVariantResponse> AddVariantAsync(
            Guid id,
            ProductVariantInput request)
        {
            var product = await GetRequiredProductAsync(id);

            await EnsureSkuIsUniqueAsync(request.Sku);

            var variant = new ProductVariant(
                product.Id,
                request.Sku,
                request.Price);

            product.Variants.Add(variant);

            await SaveChangesAsync();

            return ToVariantResponse(variant);
        }

        public async Task<ProductVariantResponse> UpdateVariantAsync(
            Guid id,
            Guid variantId,
            ProductVariantInput request)
        {
            var variant = await db.ProductVariant
                .SingleOrDefaultAsync(candidate =>
                    candidate.Id == variantId &&
                    candidate.ProductId == id);

            if (variant is null)
            {
                throw new KeyNotFoundException(
                    "Variante não encontrada para o produto informado.");
            }

            await EnsureSkuIsUniqueAsync(request.Sku, variantId);

            variant.Update(request.Sku, request.Price);

            await SaveChangesAsync();

            return ToVariantResponse(variant);
        }

        public async Task<CategoryResponse> GetCategoryAsync(Guid id)
        {
            var category = await db.Categories
                .AsNoTracking()
                .SingleOrDefaultAsync(candidate => candidate.Id == id);

            if (category is null)
            {
                throw new KeyNotFoundException("Categoria não encontrada.");
            }

            return ToCategoryResponse(category);
        }

        public async Task<CategoryResponse> CreateCategoryAsync(
            CreateCategoryRequest request)
        {
            await EnsureCategorySlugIsUniqueAsync(request.Slug);

            var category = new Category(
                request.Name,
                request.Slug);

            await db.Categories.AddAsync(category);
            await SaveChangesAsync();

            return ToCategoryResponse(category);
        }

        public async Task<CategoryResponse> UpdateCategoryAsync(
            Guid id,
            CreateCategoryRequest request)
        {
            var category = await db.Categories
                .SingleOrDefaultAsync(candidate => candidate.Id == id);

            if (category is null)
            {
                throw new KeyNotFoundException("Categoria não encontrada.");
            }

            await EnsureCategorySlugIsUniqueAsync(request.Slug, id);

            category.Update(
                request.Name,
                request.Slug);

            await SaveChangesAsync();

            return ToCategoryResponse(category);
        }
        private async Task<Product> GetRequiredProductAsync(Guid id)
        {
            var product = await db.Products
                .Include(candidate => candidate.Variants)
                .Include(candidate => candidate.Images)
                .SingleOrDefaultAsync(candidate => candidate.Id == id);

            if (product is null)
            {
                throw new KeyNotFoundException("Produto não encontrado.");
            }

            return product;
        }

        private async Task EnsureCategoryExistsAsync(Guid categoryId)
        {
            var categoryExists = await db.Categories
                .AnyAsync(category =>
                    category.Id == categoryId &&
                    category.IsActive);

            if (!categoryExists)
            {
                throw new InvalidOperationException(
                    "A categoria informada não existe ou está inativa.");
            }
        }

        private async Task EnsureProductSlugIsUniqueAsync(
            string slug,
            Guid productId)
        {
            var normalizedSlug = slug.Trim().ToLowerInvariant();

            var slugAlreadyExists = await db.Products
                .AnyAsync(product =>
                    product.Id != productId &&
                    product.Slug == normalizedSlug);

            if (slugAlreadyExists)
            {
                throw new InvalidOperationException(
                    "Já existe outro produto com esse slug.");
            }
        }

        private async Task EnsureSkuIsUniqueAsync(
            string sku,
            Guid? variantId = null)
        {
            var normalizedSku = sku.Trim().ToUpperInvariant();

            var skuAlreadyExists = await db.ProductVariant
                .AnyAsync(variant =>
                    variant.Sku == normalizedSku &&
                    (!variantId.HasValue || variant.Id != variantId.Value));

            if (skuAlreadyExists)
            {
                throw new InvalidOperationException(
                    $"O SKU '{normalizedSku}' já está sendo utilizado.");
            }
        }

        private async Task EnsureCategorySlugIsUniqueAsync(
            string slug,
            Guid? categoryId = null)
        {
            var normalizedSlug = slug.Trim().ToLowerInvariant();

            var slugAlreadyExists = await db.Categories
                .AnyAsync(category =>
                    category.Slug == normalizedSlug &&
                    (!categoryId.HasValue || category.Id != categoryId.Value));

            if (slugAlreadyExists)
            {
                throw new InvalidOperationException(
                    "Já existe outra categoria com esse slug.");
            }
        }

        private static ProductImageResponse ToImageResponse(
            ProductImage image)
        {
            return new ProductImageResponse
            {
                Id = image.Id,
                ProductId = image.ProductId,
                Url = image.Url,
                AltText = image.AltText,
                DisplayOrder = image.DisplayOrder
            };
        }

        private static ProductVariantResponse ToVariantResponse(
            ProductVariant variant)
        {
            return new ProductVariantResponse
            {
                Id = variant.Id,
                ProductId = variant.ProductId,
                Sku = variant.Sku,
                Price = variant.Price
            };
        }

        private static CategoryResponse ToCategoryResponse(
            Category category)
        {
            return new CategoryResponse
            {
                Id = category.Id,
                Name = category.Name,
                Slug = category.Slug,
                IsActive = category.IsActive
            };
        }
        private async Task<ProductVariant?> GetProductAsyncBySku(string sku) => await db.ProductVariant.Where( p => p.Sku == sku ).FirstOrDefaultAsync();
        private static ProductVariant ToVariant(ProductVariantInput variantInput) => new(variantInput.ProductId, variantInput.Sku, variantInput.Price);
        private async Task SaveChangesAsync() { await db.SaveChangesAsync(); }
    }
}
