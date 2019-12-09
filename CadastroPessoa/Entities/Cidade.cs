using System.ComponentModel.DataAnnotations.Schema;

namespace CadastroPessoa.Entities
{
    public class Cidade : Entity
    {
        public string nome { get; set; }

        [ForeignKey("estado")]
        public int estado { get; set; }
        public virtual Estado Estado { get; set; }
    }
}
