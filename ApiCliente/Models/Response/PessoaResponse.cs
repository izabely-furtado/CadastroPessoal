using System;
using System.Collections.Generic;

namespace ApiCliente.Models.Response
{
    public class PessoaResponse
    {
        public string nome { get; set; }
        public string sobrenome { get; set; }
        public string telefone_ddd { get; set; }
        public string telefone_numero { get; set; }
        public string cpf { get; set; }
        public DateTime? data_nascimento { get; set; }
        public string Email { get; set; }

        //public string foto_perfil { get; set; }
        //public string foto_perfil_link { get; set; }
        public List<EnderecoResponse> enderecos { get; set; }
    }
}
