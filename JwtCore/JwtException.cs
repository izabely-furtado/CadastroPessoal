using System;
using System.Globalization;

namespace NusaJwt
{
    public class JwtException : Exception
    {
        #region Mensagens
        public static readonly string ERRO_AO_GERAR_TOKEN = "ERRO_AO_GERAR_TOKEN";
        public static readonly string ERRO_AO_CARREGAR_WEB_CONFIG = "ERRO_AO_CARREGAR_WEB_CONFIG";
        #endregion

        public JwtException() : base()
        {
        }

        public JwtException(string message) : base(message) { }

        public JwtException(string message, params object[] args)
            : base(string.Format(CultureInfo.CurrentCulture, message, args))
        {
        }
        public JwtException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
