using System;

namespace CadastroPessoa.Util
{
    public class Telefone
    {
        public static bool ValidaDdd (string ddd)
        {
            try
            {
                int ddd_numero = Convert.ToInt32(ddd);
                if (10 > ddd_numero || ddd_numero > 99)
                    return false;
            }
            catch
            {
                return false;
            }
            return true;
        }

        public static bool ValidaTelefone(string telefone)
        {
            telefone = telefone.Replace("-", "");
            if (telefone.Length < 8 || telefone.Length > 9)
                return false;

            return true;
        }
    }
}
