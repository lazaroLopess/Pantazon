using System.Text.Json.Serialization;

namespace Pantazon.Domain.Entities
{
    public class Product
    {
        private Product() { }

        public Product(
            string name,
            string slug,
            string description,
            decimal price,
            string sku,
            Guid categoryId,
            int stockQuantity = 0)
        {
            Id = Guid.NewGuid();
            Name = name;
            Slug = slug;
            Description = description;
            Price = price;
            SKU = sku;
            StockQuantity = stockQuantity;
            CategoryId = categoryId;
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.MinValue;
            CategoryName = "";
        }

        public Guid Id { get; private set; }

        public string Name { get; private set; } = null!;

        public string Slug { get; private set; } = null!;

        public string? Description { get; private set; }

        public decimal Price { get; private set; }

        public int StockQuantity { get; private set; }

        public string SKU { get; private set; } = null!;

        public bool IsActive { get; private set; } = true;

        [JsonIgnore]
        public Category Category { get; private set; } = null!;

        public Guid CategoryId { get; private set; }

        public string CategoryName { get; set; } = null!;

        public DateTime CreatedAt { get; private set; }

        public DateTime UpdatedAt { get; private set; }
    }
}
