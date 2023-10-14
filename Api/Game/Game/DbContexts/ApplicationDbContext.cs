using Game.Entities.ForAdmin;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Game.DbContexts
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<ApkFile> ApkFiles { get; set; }
        public DbSet<InfoApkFile> InfoApkFiles { get; set; }
        public DbSet<ImageFile> ImageFiles { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
