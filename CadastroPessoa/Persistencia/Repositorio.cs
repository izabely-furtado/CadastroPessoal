using Microsoft.EntityFrameworkCore;
using CadastroPessoa.Entities;
using System.Linq;

namespace CadastroPessoa.Persistencia
{
    public class Repositorio : DbContext
    {

        public static string ConnectionString { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(ConnectionString);
        }

        public DbSet<Cidade> Cidades { get; set; }
        public DbSet<Estado> Estados { get; set; }
        public DbSet<Pessoa> Pessoas { get; set; }
        public DbSet<Endereco> Enderecos { get; set; }
      
        public DbSet<EscalaIntervalo> EscalaIntervalos { get; set; }
       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("public");
            modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetProperties()).ToList()
                .ForEach(c => c.Relational().ColumnName = ToSnakeCase(c.Name));

            modelBuilder.Entity<Cidade>().ToTable("cidade");
            modelBuilder.Entity<Estado>().ToTable("estado");
            modelBuilder.Entity<Pessoa>().ToTable("pessoa");
            modelBuilder.Entity<Endereco>().ToTable("endereco");
            
            modelBuilder.Entity<EscalaIntervalo>().ToTable("escala_intervalo");
         
        }

        private string ToSnakeCase(string str)
        {
            return string.Concat(str.Select((x, i) => i > 0 && char.IsUpper(x) ? "_" + x.ToString() : x.ToString())).ToLower();
        }
    }
}
