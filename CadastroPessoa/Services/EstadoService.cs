using CadastroPessoa.Entities;
using CadastroPessoa.Persistencia;
using CadastroPessoa.Util;
using System.Collections.Generic;
using System.Linq;

namespace CadastroPessoa.Services
{
    public class EstadoService
    {
        public static List<Estado> Listar()
        {
            using (Repositorio ctx = new Repositorio())
            {
                var lista = ctx.Estados.ToList();
                return ctx.Estados.ToList();
            }
        }

        public static Estado Obter(int uuid)
        {
            using (Repositorio ctx = new Repositorio())
            {
                return ctx.Estados.Where(a => a.id == uuid).FirstOrDefault();
            }
        }

        public static List<Cidade> ObterCidades(int uuid)
        {
            using (Repositorio ctx = new Repositorio())
            {
                Estado _estado = ctx.Estados.Where(x => x.id == uuid).FirstOrDefault();
                if (_estado == null)
                    throw new ApplicationNotFoundException(ApplicationNotFoundException.ESTADO_NAO_ENCONTRADO);

                return ctx.Cidades.Where(a => a.estado == _estado.id).ToList();
            }
        }


    }
}
