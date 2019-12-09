using System;
using System.Globalization;

namespace Encrypt
{
    public class EncryptException : Exception
    {
        #region Mensagens
        public static readonly string PASSWORD_NULL = "PASSWORD_NULL";
        public static readonly string PASSWORD_EMPTY = "Value cannot be empty or whitespace only string";
        #endregion

        public EncryptException() : base()
        {
        }

        public EncryptException(string message) : base(message) { }

        public EncryptException(string message, params object[] args)
            : base(String.Format(CultureInfo.CurrentCulture, message, args))
        {
        }

        public EncryptException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
