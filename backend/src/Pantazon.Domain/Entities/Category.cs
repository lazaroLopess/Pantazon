namespace Pantazon.Domain.Entities
{
    public class Category
    {
        private Category() { }

        public Category(string name, string slug)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("category name is required");

            Id = Guid.NewGuid();
            Name = name;
            Slug = slug;
            IsActive = true;
            CreatedAt = DateTime.UtcNow;
        }

        public Guid Id { get; private set; }

        public string Name { get; private set; } = null!;

        public string Slug { get; private set; } = null!;

        public bool IsActive { get; private set; }

        public DateTime CreatedAt { get; private set; }

        public DateTime UpdatedAt { get; private set; }

        public ICollection<Product> Products { get; private set; } = [];

        public void Update(string name, string slug)
        {
            Name = name;
            Slug = slug;
            UpdatedAt = DateTime.UtcNow;
        }

        public void Deactivate()
        {
            IsActive = false;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
