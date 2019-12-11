using LinqKit;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using CadastroPessoa.Entities;
using CadastroPessoa.Models;
using CadastroPessoa.Persistencia;
using CadastroPessoa.Util;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CadastroPessoa.Services
{
    public class EnderecoService
    {

        public static Endereco Obter(int uuid)
        {
            using (Repositorio ctx = new Repositorio())
            {
                return ctx.Enderecos.Where(a => a.id == uuid).First();
            }
        }

        public static List<Endereco> Listar()
        {
            using (Repositorio ctx = new Repositorio())
            {
                return ctx.Enderecos.ToList();
            }
        }

        public static Endereco Salvar(Endereco pessoa_)
        {
            using (Repositorio ctx = new Repositorio())
            {
                pessoa_.Validar();
                Endereco _pessoa = ctx.Enderecos.Where(x => x.id.Equals(pessoa_.id)).FirstOrDefault();

                RequisicaoHTTP requisicao = new RequisicaoHTTP();
                ctx.Enderecos.Add(pessoa_);
                ctx.SaveChanges();
                return pessoa_;
            }
        }

        public static bool Deletar(int uuid)
        {
            using (Repositorio ctx = new Repositorio())
            {
                Endereco _endereco = ctx.Enderecos
                    .Where(s => s.id == uuid).FirstOrDefault();

                if (_endereco == null)
                    return true;

                ctx.Remove(_endereco);
                ctx.SaveChanges();

                return true;
            }
        }






    }
}