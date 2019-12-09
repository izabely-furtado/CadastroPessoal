using System.Collections.Generic;

namespace CadastroPessoa.Entities
{
    public class Estado : Entity
    {
        public int id { get; set; }
        public string nome { get; set; }
        public string uf { get; set; }
    }
}
