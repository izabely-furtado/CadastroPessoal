using CadastroPessoa.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CadastroPessoa.Entities
{
    public class PessoaEndereco : Entity
    {

        [ForeignKey("Pessoa")]
        public int id_pessoa { get; set; }
        public virtual Pessoa Pessoa { get; set; }

        [ForeignKey("Endereco")]
        public int id_endereco { get; set; }
        public virtual Endereco Endereco { get; set; }

        public void Validar()
        {
            //if (this.id_pessoa == 0)
            //    throw new ApplicationBadRequestException(ApplicationBadRequestException.PESSOA_INVALIDO);
            //if (this.id_endereco == 0)
            //    throw new ApplicationBadRequestException(ApplicationBadRequestException.ENDERECO_INVALIDO);
        }
    }
}
