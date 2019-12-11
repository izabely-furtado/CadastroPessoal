using System;
using System.Collections.Generic;

namespace ApiCliente.Models.Request
{
    public class PessoaRequest
    {
        public string nome { get; set; }
        public string sobrenome { get; set; }
        public string telefone_ddd { get; set; }
        public string telefone_numero { get; set; }
        public string cpf { get; set; }
        public DateTime? data_nascimento { get; set; }
        public string Email { get; set; }

        public List<EnderecoRequest> enderecos { get; set; }
    }
}
