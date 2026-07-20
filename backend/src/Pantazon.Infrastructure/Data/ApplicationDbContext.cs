using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Pantazon.Domain.Entities;
using System.Reflection.Emit;

namespace Pantazon.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ProductVariant> ProductVariant { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(
       typeof(ApplicationDbContext).Assembly);

            SeedDatabase(builder);
        }
        private static void SeedDatabase(ModelBuilder modelBuilder)
        {
            var createdAt = new DateTime(
                2026, 1, 1,
                0, 0, 0,
                DateTimeKind.Utc);

            var categories = new[]
            {
        new
        {
            Id = Guid.Parse("10000000-0000-0000-0000-000000000001"),
            Name = "Electronics",
            Slug = "electronics",
            IsActive = true,
            CreatedAt = createdAt,
            UpdatedAt = createdAt
        },
        new
        {
            Id = Guid.Parse("10000000-0000-0000-0000-000000000002"),
            Name = "Computers",
            Slug = "computers",
            IsActive = true,
            CreatedAt = createdAt,
            UpdatedAt = createdAt
        },
        new
        {
            Id = Guid.Parse("10000000-0000-0000-0000-000000000003"),
            Name = "Smartphones",
            Slug = "smartphones",
            IsActive = true,
            CreatedAt = createdAt,
            UpdatedAt = createdAt
        },
        new
        {
            Id = Guid.Parse("10000000-0000-0000-0000-000000000004"),
            Name = "Home & Kitchen",
            Slug = "home-kitchen",
            IsActive = true,
            CreatedAt = createdAt,
            UpdatedAt = createdAt
        },
        new
        {
            Id = Guid.Parse("10000000-0000-0000-0000-000000000005"),
            Name = "Fashion",
            Slug = "fashion",
            IsActive = true,
            CreatedAt = createdAt,
            UpdatedAt = createdAt
        },
        new
        {
            Id = Guid.Parse("10000000-0000-0000-0000-000000000006"),
            Name = "Beauty & Personal Care",
            Slug = "beauty-personal-care",
            IsActive = true,
            CreatedAt = createdAt,
            UpdatedAt = createdAt
        },
        new
        {
            Id = Guid.Parse("10000000-0000-0000-0000-000000000007"),
            Name = "Sports & Outdoors",
            Slug = "sports-outdoors",
            IsActive = true,
            CreatedAt = createdAt,
            UpdatedAt = createdAt
        },
        new
        {
            Id = Guid.Parse("10000000-0000-0000-0000-000000000008"),
            Name = "Books",
            Slug = "books",
            IsActive = true,
            CreatedAt = createdAt,
            UpdatedAt = createdAt
        },
        new
        {
            Id = Guid.Parse("10000000-0000-0000-0000-000000000009"),
            Name = "Toys & Games",
            Slug = "toys-games",
            IsActive = true,
            CreatedAt = createdAt,
            UpdatedAt = createdAt
        },
        new
        {
            Id = Guid.Parse("10000000-0000-0000-0000-000000000010"),
            Name = "Automotive",
            Slug = "automotive",
            IsActive = true,
            CreatedAt = createdAt,
            UpdatedAt = createdAt
        }
    };

            modelBuilder.Entity<Category>().HasData(categories);

            var productData = new[]
            {
        ("Smart TV 4K 55", "smart-tv-4k-55", "55-inch 4K smart television.", 0, 2799.90m),
        ("Bluetooth Speaker", "bluetooth-speaker", "Portable wireless Bluetooth speaker.", 0, 249.90m),
        ("Wireless Headphones", "wireless-headphones", "Wireless headphones with noise cancellation.", 0, 499.90m),
        ("Digital Camera", "digital-camera", "Compact digital camera for photos and videos.", 0, 1899.90m),
        ("Smart Watch", "smart-watch", "Smart watch with activity monitoring.", 0, 699.90m),

        ("Gaming Laptop", "gaming-laptop", "High-performance laptop for gaming.", 1, 6499.90m),
        ("Mechanical Keyboard", "mechanical-keyboard", "Mechanical keyboard with RGB lighting.", 1, 399.90m),
        ("Gaming Mouse", "gaming-mouse", "High-precision gaming mouse.", 1, 199.90m),
        ("27 Inch Monitor", "27-inch-monitor", "27-inch Full HD computer monitor.", 1, 1299.90m),
        ("External SSD 1TB", "external-ssd-1tb", "Portable 1TB solid-state drive.", 1, 649.90m),

        ("Smartphone Pro 256GB", "smartphone-pro-256gb", "Premium smartphone with 256GB storage.", 2, 4299.90m),
        ("Smartphone Lite 128GB", "smartphone-lite-128gb", "Affordable smartphone with 128GB storage.", 2, 1599.90m),
        ("Fast Charger 30W", "fast-charger-30w", "Fast USB-C wall charger.", 2, 129.90m),
        ("USB-C Cable", "usb-c-cable", "Durable USB-C charging cable.", 2, 49.90m),
        ("Phone Case", "phone-case", "Protective smartphone case.", 2, 79.90m),

        ("Air Fryer 5L", "air-fryer-5l", "Five-liter digital air fryer.", 3, 499.90m),
        ("Coffee Maker", "coffee-maker", "Electric coffee maker for daily use.", 3, 249.90m),
        ("Blender 1000W", "blender-1000w", "High-power kitchen blender.", 3, 299.90m),
        ("Cookware Set", "cookware-set", "Non-stick cookware set.", 3, 599.90m),
        ("Robot Vacuum", "robot-vacuum", "Automatic robot vacuum cleaner.", 3, 1499.90m),

        ("Men T-Shirt", "men-t-shirt", "Comfortable cotton T-shirt.", 4, 79.90m),
        ("Women Jacket", "women-jacket", "Casual women's jacket.", 4, 249.90m),
        ("Running Shoes", "running-shoes", "Lightweight running shoes.", 4, 399.90m),
        ("Leather Wallet", "leather-wallet", "Classic leather wallet.", 4, 149.90m),
        ("Casual Backpack", "casual-backpack", "Everyday casual backpack.", 4, 189.90m),

        ("Hair Dryer", "hair-dryer", "Professional hair dryer.", 5, 229.90m),
        ("Electric Shaver", "electric-shaver", "Rechargeable electric shaver.", 5, 299.90m),
        ("Skin Care Kit", "skin-care-kit", "Complete daily skin care kit.", 5, 199.90m),
        ("Perfume Classic", "perfume-classic", "Classic long-lasting fragrance.", 5, 349.90m),
        ("Makeup Brush Set", "makeup-brush-set", "Professional makeup brush set.", 5, 129.90m),

        ("Yoga Mat", "yoga-mat", "Non-slip exercise yoga mat.", 6, 119.90m),
        ("Adjustable Dumbbells", "adjustable-dumbbells", "Adjustable dumbbell training set.", 6, 699.90m),
        ("Soccer Ball", "soccer-ball", "Official-size soccer ball.", 6, 139.90m),
        ("Camping Tent", "camping-tent", "Four-person waterproof camping tent.", 6, 899.90m),
        ("Mountain Bike", "mountain-bike", "Mountain bike with multiple gears.", 6, 2199.90m),

        ("Clean Code", "clean-code", "Book about writing maintainable software.", 7, 149.90m),
        ("Domain-Driven Design", "domain-driven-design", "Book about domain-driven software design.", 7, 229.90m),
        ("CSharp in Depth", "csharp-in-depth", "Advanced guide to the C# language.", 7, 199.90m),
        ("ASP.NET Core Guide", "aspnet-core-guide", "Practical ASP.NET Core development guide.", 7, 179.90m),
        ("Software Architecture", "software-architecture", "Introduction to modern software architecture.", 7, 189.90m),

        ("Building Blocks Set", "building-blocks-set", "Creative building blocks for children.", 8, 199.90m),
        ("Remote Control Car", "remote-control-car", "Rechargeable remote-controlled car.", 8, 299.90m),
        ("Board Game", "board-game", "Strategy board game for the family.", 8, 149.90m),
        ("Plush Bear", "plush-bear", "Soft plush teddy bear.", 8, 89.90m),
        ("Puzzle 1000 Pieces", "puzzle-1000-pieces", "One-thousand-piece challenge puzzle.", 8, 99.90m),

        ("Car Phone Holder", "car-phone-holder", "Adjustable smartphone holder for cars.", 9, 89.90m),
        ("Portable Tire Inflator", "portable-tire-inflator", "Portable electric tire inflator.", 9, 299.90m),
        ("Car Vacuum Cleaner", "car-vacuum-cleaner", "Compact vacuum cleaner for vehicles.", 9, 219.90m),
        ("Car Cleaning Kit", "car-cleaning-kit", "Complete vehicle cleaning kit.", 9, 159.90m),
        ("Dash Camera", "dash-camera", "Full HD dashboard recording camera.", 9, 499.90m)
    };

            var products = productData
                .Select((product, index) => new
                {
                    Id = CreateProductId(index + 1),
                    Name = product.Item1,
                    Slug = product.Item2,
                    Description = product.Item3,
                    IsActive = true,
                    CategoryId = categories[product.Item4].Id,
                    CreatedAt = createdAt,
                    UpdatedAt = createdAt
                })
                .ToArray();

            modelBuilder.Entity<Product>().HasData(products);

            var variants = productData
                .Select((product, index) => new
                {
                    Id = CreateVariantId(index + 1),
                    ProductId = products[index].Id,
                    Sku = $"PTZ-{index + 1:0000}",
                    Price = product.Item5,
                    CreatedAt = createdAt,
                    UpdatedAt = createdAt
                })
                .ToArray();

            modelBuilder.Entity<ProductVariant>().HasData(variants);
        }
        private static Guid CreateProductId(int number)
        {
            return Guid.Parse(
                $"20000000-0000-0000-0000-{number:000000000000}");
        }

        private static Guid CreateVariantId(int number)
        {
            return Guid.Parse(
                $"30000000-0000-0000-0000-{number:000000000000}");
        }
    }
}
