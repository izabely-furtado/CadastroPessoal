using System.Collections.Generic;

namespace ApiCliente.Models.Request
{
    public class EnderecoRequest
    {        
        public string nome { get; set; }
        public string telefone_ddd { get; set; }
        public string telefone_numero { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }       
        public bool ativo { get; set; }
    }
}
