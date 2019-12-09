using System;
using System.Globalization;

namespace CadastroPessoa.Util
{
    public class ApplicationBadRequestException : Exception
    {
        #region Mensagens
        public static readonly string IDENTIFICADOR_INVALIDO = "Identificador inválido.";
        public static readonly string NOME_INVALIDO = "Nome inválido.";
        public static readonly string DATA_NASCIMENTO_INVALIDA = "Data de nascimento inválida.";
        public static readonly string SEXO_INVALIDO = "Sexo inválido.";
        public static readonly string REGIONAL_INVALIDA = "Regional inválida.";
        public static readonly string MUNICIPIO_INVALIDO = "Município inválido.";
        public static readonly string BAIRRO_INVALIDO = "Bairro inválido.";
        public static readonly string LOCALIZACAO_INVALIDA = "Localizacao inválida.";
        public static readonly string LOGRADOURO_INVALIDO = "Logradouro inválido.";
        public static readonly string LOGRADOURO_NUMERO_INVALIDO = "Logradouro número inválido.";
        public static readonly string DESCRICAO_INVALIDA = "Descrição inválida.";
        public static readonly string CARGA_HORARIA_INVALIDA = "Carga horária inválida.";
        public static readonly string CPF_INVALIDO = "CPF inválido.";
        public static readonly string TELEFONE_INVALIDO = "Telefone inválido.";
        public static readonly string DDD_TELEFONE_INVALIDO = "DDD telefone inválido.";
        public static readonly string CEP_INVALIDO = "CEP inválido.";
        public static readonly string SOBRENOME_INVALIDO = "Sobrenome inválido.";
        public static readonly string CPF_JA_CADASTRADO = "Cpf já cadastrado.";
        public static readonly string EMAIL_INVALIDO = "Email inválido.";
        public static readonly string EMAIL_JA_CADASTRADO = "Email já cadastrado.";
        public static readonly string IDENTIDADE_INVALIDA = "Identidade inválida.";
        public static readonly string NUMERO_INVALIDO = "Número inválido.";
        public static readonly string NUMERO_DUPLICADO = "Número já existe.";
        public static readonly string ESTADO_INVALIDO = "Estado inválido.";
        public static readonly string CIDADE_INVALIDA = "Cidade inválida.";
        public static readonly string ESTILO_INVALIDO = "Estilo inválido.";
        public static readonly string STATUS_INVALIDO = "Status inválido.";
        public static readonly string TIPO_INVALIDO = "Tipo inválido.";
        public static readonly string DATA_INICIO_INVALIDA = "Data de início inválida.";
        public static readonly string DATA_TERMINO_INVALIDA = "Data de termino inválida.";
        public static readonly string SETOR_INVALIDO = "Setor inválido.";
        public static readonly string QUANTIDADE_INVALIDA = "Quantidade Inválida.";
        public static readonly string FUNCIONARIO_EXISTENTE = "Funcionário já existe.";
        public static readonly string HORA_INICIO_INVALIDO = "Hora de início inválido.";
        public static readonly string HORA_FIM_INVALIDO = "Hora final inválido.";
        public static readonly string HORA_INICIO_MENOR_HORA_FIM = "Hora inicio menor que a hora fim.";
        public static readonly string SETOR_TURNO_INVALIDO = "Setor turno inválido ou nulo.";
        public static readonly string CARGO_INVALIDO = "Cargo inválido ou nulo.";
        public static readonly string FUNCIONARIO_INVALIDO = "Funcionário inválido ou nulo.";
        public static readonly string GERENTE_EXISTENTE = "Gerente já existe.";
        public static readonly string ERRO_AO_CADASTRAR_PESSOA = "Erro ao cadastrar pessoa no sistema presença";
        public static readonly string CPF_EXISTENTE = "Cpf já cadastrado.";
        public static readonly string TURNO_EXISTENTE = "Turno já existe.";
        public static readonly string FUNCIONARIO_CARGO_EXISTENTE = "Funcionário já possui este cargo e vínculo.";
        public static readonly string SIGLA_INVALIDA = "Sigla inválida.";
        public static readonly string FILTRO_INVALIDO = "Filtro inválido.";
        public static readonly string CARGO_EXISTENTE = "Cargo já existe neste cliente.";
        public static readonly string ANO_INVALIDO = "Ano inválido.";
        public static readonly string MES_INVALIDO = "Mes inválido.";
        public static readonly string DATA_INVALIDA = "Data inválida.";
        public static readonly string FUNCIONARIO_INATIVO = "Funcionário encontra-se inativo.";
        public static readonly string FUNCIONARIO_SOLICITANTE_INVALIDO = "Funcionário solicitante inválido ou nulo.";
        public static readonly string FUNCIONARIO_REQUISITADO_INVALIDO = "Funcionário requisitado inválido ou nulo.";
        public static readonly string FUNCIONARIO_NAO_PERMITIDO = "Funcionário não permitido a realizar a ação.";
        public static readonly string ACAO_NAO_PERMITIDA = "Ação não permitida.";
        public static readonly string EMAIL_NAO_CADASTRADO = "Funcionário não possui email cadastrado.";


        public static readonly string PESSOA_INVALIDO = "Pessoa inválida.";
        public static readonly string ENDERECO_INVALIDO = "Endereço inválido.";
        public static readonly string RUA_INVALIDO = "Rua inválida.";



        #endregion
        public string ContentType { get; set; } = @"application/json";

        public ApplicationBadRequestException() : base()
        {
        }

        public ApplicationBadRequestException(string message) : base(message) { }

        public ApplicationBadRequestException(string message, params object[] args)
            : base(string.Format(CultureInfo.CurrentCulture, message, args))
        {
        }
        public ApplicationBadRequestException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
