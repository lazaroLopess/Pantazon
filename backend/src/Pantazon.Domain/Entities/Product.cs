using Pantazon.Domain.Common;

namespace Pantazon.Domain.Entities;

public class Product : Entity
{
    private Product()
    {
    }

    public Product(
        string name,
        string slug,
        string? description,
        Guid categoryId)
    {
        Update(name, slug, description, categoryId);
    }

    public string Name { get; private set; } = null!;

    public string Slug { get; private set; } = null!;

    public string? Description { get; private set; }

    public bool IsActive { get; private set; } = true;

    public Category Category { get; private set; } = null!;

    public Guid CategoryId { get; private set; }

    public ICollection<ProductVariant> Variants { get; private set; }

    public ICollection<ProductImage> Images { get; private set; } = [];

    public void Update(
        string name,
        string slug,
        string? description,
        Guid categoryId)
    {
        Name = name.Trim();
        Slug = slug.Trim().ToLowerInvariant();
        Description = description?.Trim();
        CategoryId = categoryId;

        Updated();
    }
}