namespace F1API.Contexts;

using F1API.Models;
using Microsoft.EntityFrameworkCore;

public class F1Context : DbContext
{
    public F1Context(DbContextOptions<F1Context> options):base(options){}

    public DbSet<Driver> Drivers {get; set;}
}