using System;
using System.Collections.Generic;
using System.Text;

namespace CadastroPessoa.Util
{
    public class Validador
    {
        public static bool ValidarEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch { return false; }
        }
    }
}
