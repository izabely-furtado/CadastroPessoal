using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CadastroPessoa.Entities
{
    public class EscalaIntervalo : Entity
    {
        public DateTime CriadoEm { get; set; }
        public TimeSpan HoraPonto { get; set; }
        public int? BancoHoraMinutos { get; set; }
    }
}
