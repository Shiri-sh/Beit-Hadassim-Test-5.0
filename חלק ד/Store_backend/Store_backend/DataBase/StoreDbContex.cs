using Microsoft.EntityFrameworkCore;
using Store_backend.Classes;
using System.Collections.Generic;

public class StoreDbContext : DbContext
{
    public StoreDbContext(DbContextOptions<StoreDbContext> options) : base(options) { }

    public DbSet<Supplier> Supplier { get; set; }
    public DbSet<OrderType> OrderType { get; set; }
    public DbSet<Good> Good { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer("Server=DESKTOP-B9CVERF\\SQLEXPRESS;Database=Store_Data_Base;Trusted_Connection=True;TrustServerCertificate=True;");
        }
    }
}