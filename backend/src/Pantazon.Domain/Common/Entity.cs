namespace Pantazon.Domain.Common
{
    public abstract class Entity
    {
        public Guid Id { get; protected set; }
        public DateTime CreatedAt { get; protected set; } = DateTime.Now;
        public DateTime UpdatedAt { get; protected set; }
        protected void Updated() => UpdatedAt = DateTime.Now;
    }
}
