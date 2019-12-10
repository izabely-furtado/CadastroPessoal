using NusaJwt;

namespace ApiCliente.Models.Request
{
    public class AutorizacaoRequest
    {
        public TYPE_AUTH Tipo { get; set; }
        public string Token { get; set; }
        public string Dominio { get; set; }
    }
}
