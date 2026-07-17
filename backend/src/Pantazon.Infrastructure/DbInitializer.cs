using Microsoft.EntityFrameworkCore;
using Pantazon.Domain.Entities;
using Pantazon.Infrastructure.Data;

namespace Pantazon.Infrastructure
{
    public class DatabaseSeeder
    {
        public async static Task SeedCategoriesAsync(ApplicationDbContext context)
        {
            if (await context.Categories.AnyAsync())
            {
                return;
            }
            List<Category> categories = new List<Category>()
            {
                new ("Electronics", "electronics"),
                new ("Computers", "computers"),
                new ("Smartphones", "smartphones"),
                new ("Home & Kitchen", "home-kitchen"),
                new ("Fashion", "fashion"),
                new ("Beauty & Personal Care", "beauty-personal-care"),
                new ("Sports & Outdoors", "sports-outdoors"),
                new ("Books", "books"),
                new ("Toys & Games", "toys-games"),
                new ("Automotive", "automotive")
            };
            await context.Categories.AddRangeAsync(categories);
            await context.SaveChangesAsync();
        }
        public async static Task SeedProductsAsync(ApplicationDbContext context)
        {
            if (await context.Products.AnyAsync())
                return;

            var categories = await context.Categories.ToListAsync();

            if (categories.Count == 0)
                return;
            var random = new Random();

            string[] adjectives =
            [
                "Premium", "Ultra", "Smart", "Portable", "Professional",
        "Gaming", "Wireless", "Compact", "Modern", "Deluxe"
            ];

            string[] products =
            [
                "Laptop", "Mouse", "Keyboard", "Monitor", "Headphones",
        "Chair", "Desk", "Phone", "Tablet", "Camera",
        "Backpack", "Sneakers", "Watch", "Speaker", "Microphone",
        "Printer", "Router", "SSD", "Power Bank", "Webcam"
            ];

            var list = new List<Product>();

            for (int i = 1; i <= 100; i++)
            {
                var adjective = adjectives[random.Next(adjectives.Length)];
                var productName = products[random.Next(products.Length)];

                var name = $"{adjective} {productName} {i}";

                list.Add(new Product(
                    name: name,
                    slug: name.ToLower().Replace(" ", "-"),
                    description: $"High quality {productName.ToLower()} designed for everyday use.",
                    price: Math.Round((decimal)(random.NextDouble() * 1900 + 100), 2),
                    sku: $"PTZ-{i:0000}",
                    categoryId: categories[random.Next(categories.Count)].Id,
                    stockQuantity: random.Next(0, 250)
                ));
            }

            await context.Products.AddRangeAsync(list);
            await context.SaveChangesAsync();
        }
    }
}
