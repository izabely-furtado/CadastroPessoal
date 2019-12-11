using System.Collections.Generic;

namespace ApiCliente.Models.Request
{
    public class EnderecoRequest
    {
        public string nome { get; set; }
        public string rua { get; set; }
        public int numero { get; set; }
        public string cep { get; set; }
        public string bairro { get; set; }
        public string uf { get; set; }
    }
}
