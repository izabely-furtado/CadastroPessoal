using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using CadastroPessoa.Util;

namespace CadastroPessoa.Entities
{
    public class Endereco : Entity
    {
        public string nome { get; set; }
        public string rua { get; set; }
        public int numero { get; set; }
        public string cep { get; set; }
        public string bairro { get; set; }
        public string uf { get; set; }

        [ForeignKey("Pessoa")]
        public int id_pessoa { get; set; }
        public virtual Pessoa Pessoa { get; set; }

        public void Validar()
        {
            if (string.IsNullOrWhiteSpace(nome))
                throw new ApplicationBadRequestException(ApplicationBadRequestException.NOME_INVALIDO);

            if (string.IsNullOrWhiteSpace(rua))
                throw new ApplicationBadRequestException(ApplicationBadRequestException.RUA_INVALIDO);

            if (numero == 0)
                throw new ApplicationBadRequestException(ApplicationBadRequestException.NUMERO_INVALIDO);

            if (string.IsNullOrWhiteSpace(cep))
                throw new ApplicationBadRequestException(ApplicationBadRequestException.CEP_INVALIDO);

            if (string.IsNullOrWhiteSpace(bairro))
                throw new ApplicationBadRequestException(ApplicationBadRequestException.BAIRRO_INVALIDO);

            if (string.IsNullOrWhiteSpace(uf))
                throw new ApplicationBadRequestException(ApplicationBadRequestException.ESTADO_INVALIDO);
            
        }
    }
}
