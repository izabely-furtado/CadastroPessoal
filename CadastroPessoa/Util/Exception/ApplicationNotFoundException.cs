using System.Globalization;
using System;

namespace CadastroPessoa.Util
{
    public class ApplicationNotFoundException : Exception
    {
        #region Mensagens
        public static readonly string MUNICIPIO_NAO_ENCONTRADO = "Município não encontrado.";
        public static readonly string BAIRRO_NAO_ENCONTRADO = "Bairro não encontrado.";
        public static readonly string REGIONAL_NAO_ENCOTRADA = "Regional não encontrada.";
        public static readonly string NACIONALIDADE_NAO_ENCONTRADA = "Nacionalidade não encontrada.";
        public static readonly string ESTADO_NAO_ENCONTRADO = "Estado não encontrado.";
        public static readonly string SETOR_NAO_ENCONTRADO = "Setor não encontrado.";
        public static readonly string FUNCIONARIO_NAO_ENCONTRADO = "Funcionário não encontrado.";
        public static readonly string SETOR_TURNO_NAO_ENCONTRADO = "Setor turno não encontrado.";
        public static readonly string FUNCIONARIO_CARGO_NAO_ENCONTRADO = "Funcionário cargo não encontrado.";
        public static readonly string FUNCIONARIO_SEM_CLIENTE = "Funcionário sem cliente vinculado.";
        public static readonly string ENDERECO_NAO_ENCONTRADO = "Endereço não encontrado.";
        public static readonly string PESSOA_NAO_ENCONTRADO = "Pessoa não encontrada.";

        #endregion

        public string ContentType { get; set; } = @"text/plain";

        public ApplicationNotFoundException() : base()
        {
        }

        public ApplicationNotFoundException(string message) : base(message) { }

        public ApplicationNotFoundException(string message, params object[] args)
            : base(string.Format(CultureInfo.CurrentCulture, message, args))
        {
        }

        public ApplicationNotFoundException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
