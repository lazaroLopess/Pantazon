using Pantazon.Domain.Common;

namespace Pantazon.Domain.Entities;

public class ProductVariant : Entity
{
    private ProductVariant()
    {
    }

    public ProductVariant(
        Guid productId,
        string sku,
        decimal price)
    {
        ProductId = productId;
        Update(sku, price);
    }

    public Guid ProductId { get; private set; }

    public Product Product { get; private set; } = null!;

    public string Sku { get; private set; } = null!;

    public decimal Price { get; private set; }

    public void Update(string sku, decimal price)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(sku);

        if (price < 0)
        {
            throw new ArgumentOutOfRangeException(
                nameof(price),
                "O preço não pode ser negativo.");
        }

        Sku = sku.Trim().ToUpperInvariant();
        Price = price;

        Updated();
    }
}