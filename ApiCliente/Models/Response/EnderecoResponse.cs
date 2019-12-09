using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiCliente.Models.Response
{
    public class EnderecoResponse
    {
        public int id { get; set; }
        public string nome { get; set; }
        public string rua { get; set; }
        public int numero { get; set; }
        public string cep { get; set; }
        public string bairro { get; set; }
        public string uf { get; set; }
    }
}
