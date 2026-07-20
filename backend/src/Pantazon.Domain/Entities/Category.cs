using Pantazon.Domain.Common;

namespace Pantazon.Domain.Entities
{
    public class Category : Entity
    {
        private Category() { }

        public Category(string name, string slug)
        {
            Update(name, slug);
            IsActive = true;
        }

        public string Name { get; private set; } = null!;

        public string Slug { get; private set; } = null!;

        public bool IsActive { get; private set; }

        public ICollection<Product> Products { get; private set; } = [];

        public void Update(string name, string slug)
        {
            Name = name;
            Slug = slug;
            Updated();
        }

        public void Deactivate()
        {
            IsActive = false;
            Updated();
        }
    }
}
