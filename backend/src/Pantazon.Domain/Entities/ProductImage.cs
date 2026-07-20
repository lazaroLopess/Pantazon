using Pantazon.Domain.Common;

namespace Pantazon.Domain.Entities;

public class ProductImage : Entity
{
    private ProductImage()
    {
    }

    public ProductImage(
        Guid productId,
        string url,
        string? altText,
        int displayOrder)
    {
        ProductId = productId;
        Update(url, altText, displayOrder);
    }

    public Guid ProductId { get; private set; }

    public Product Product { get; private set; } = null!;

    public string Url { get; private set; } = null!;

    public string? AltText { get; private set; }

    public int DisplayOrder { get; private set; }

    public void Update(
        string url,
        string? altText,
        int displayOrder)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(url);

        if (displayOrder < 0)
        {
            throw new ArgumentOutOfRangeException(
                nameof(displayOrder),
                "A ordem da imagem não pode ser negativa.");
        }

        Url = url.Trim();
        AltText = altText?.Trim();
        DisplayOrder = displayOrder;

        Updated();
    }
}