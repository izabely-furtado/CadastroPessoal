using NusaJwt;
using CadastroPessoa.Entities;
using System.Collections.Generic;

namespace ApiCliente.Models.Response
{
    public class AuthResponse
    {
        public bool autenticado { get; set; }
        public string criado_em { get; set; }
        public string expira_em { get; set; }
        public string token_acesso { get; set; }
        public string usuario_token { get; set; }
        public string usuario_nome { get; set; }
        public string cliente_nome { get; set; }
        public string mensagem { get; set; }
        public TYPE_AUTH tipo { get; set; }
        public string login { get; set; }
        public string dominio { get; set; }
    }
}
