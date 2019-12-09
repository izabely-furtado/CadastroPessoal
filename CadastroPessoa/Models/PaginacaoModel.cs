using System;
using System.Collections.Generic;
using System.Text;

namespace CadastroPessoa.Models
{
    public class PaginacaoModel
    {
        public int total_paginas { get; set; }
        public int pagina_atual { get; set; }
        public int quantidade_pagina { get; set; }
        public int quantidade_total { get; set; }
        public object conteudo { get; set; }
    }
}
