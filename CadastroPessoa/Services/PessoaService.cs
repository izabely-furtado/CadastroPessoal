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
    public class PessoaService
    {

        public static Pessoa Obter(string uuid)
        {
            using (Repositorio ctx = new Repositorio())
            {
                return ctx.Pessoas.Include(a => a.enderecos)
                    .Where(a => a.cpf == uuid).FirstOrDefault();
            }
        }

        public static Pessoa ObterApiPessoa(int pessoa_uuid, int uuid)
        {
            using (Repositorio ctx = new Repositorio())
            {
                Pessoa _pessoa = ctx.Pessoas.Where(a => a.id == pessoa_uuid).FirstOrDefault();
                return ctx.Pessoas
                    .Include(a => a.enderecos)
                    .Where(a => a.id == uuid).FirstOrDefault();
            }
        }

        public static List<Pessoa> Listar()
        {
            using (Repositorio ctx = new Repositorio())
            {
                return ctx.Pessoas.ToList();
            }
        }

        public static Pessoa Salvar(Pessoa pessoa_)
        {
            using (Repositorio ctx = new Repositorio())
            {
                pessoa_.Validar();
                Pessoa _pessoa = ctx.Pessoas.Where(x => x.cpf.Equals(pessoa_.cpf)).FirstOrDefault();

                if (_pessoa != null && _pessoa.id != 0)
                {
                    return PessoaService.Editar(_pessoa.id, pessoa_);
                }
                //throw new ApplicationBadRequestException(ApplicationBadRequestException.ERRO_AO_CADASTRAR_PESSOA);

                _pessoa = new Pessoa();
                _pessoa.nome = pessoa_.nome.ToUpper();
                _pessoa.sobrenome = pessoa_.sobrenome.ToUpper();
                if (pessoa_.Email != null)
                    _pessoa.Email = pessoa_.Email.ToLower();

                foreach (Endereco item in _pessoa.enderecos)
                {
                    item.Validar();
                    ctx.Enderecos.Add(item);
                }

                RequisicaoHTTP requisicao = new RequisicaoHTTP();
                Pessoa pessoa = new Pessoa();
                pessoa.nome = pessoa_.nome;
                pessoa.sobrenome = pessoa_.sobrenome;
                pessoa.cpf = pessoa_.cpf;
                pessoa.telefone_ddd = pessoa_.telefone_ddd;
                pessoa.telefone_numero = pessoa_.telefone_numero;
                pessoa.data_nascimento = pessoa_.data_nascimento;


                //if (pessoaRetorno == null)
                //    throw new ApplicationBadRequestException(ApplicationBadRequestException.ERRO_AO_CADASTRAR_PESSOA);
                //pessoa.id = pessoa.id;
                //pessoa.FotoPerfil = pessoaRetorno.foto_perfil;
                ctx.Pessoas.Add(pessoa);
                ctx.SaveChanges();
                return pessoa;
            }
        }

        public static Pessoa Editar(int uuid, Pessoa pessoa)
        {
            using (Repositorio ctx = new Repositorio())
            {
                Pessoa _pessoa = ctx.Pessoas
                    .Include(a => a.enderecos)
                    .Where(x => x.id == uuid).FirstOrDefault();
                if (_pessoa == null)
                    throw new ApplicationNotFoundException(ApplicationNotFoundException.FUNCIONARIO_NAO_ENCONTRADO);

                Pessoa _pessoa1 = ctx.Pessoas.Where(x => x.id != uuid && x.cpf.Equals(pessoa.cpf)).FirstOrDefault();
                if (_pessoa1 != null)
                    throw new ApplicationBadRequestException(ApplicationBadRequestException.CPF_EXISTENTE);

                pessoa.Validar();

                _pessoa.nome = pessoa.nome.ToUpper();
                _pessoa.sobrenome = pessoa.sobrenome.ToUpper();
                if (!String.IsNullOrEmpty(pessoa.Email))
                    _pessoa.Email = pessoa.Email.ToLower();
                _pessoa.telefone_ddd = pessoa.telefone_ddd;
                _pessoa.telefone_numero = pessoa.telefone_numero;
                _pessoa.cpf = pessoa.cpf;
                _pessoa.data_nascimento = pessoa.data_nascimento;

                if (_pessoa.enderecos != null && _pessoa.enderecos.Count() > 0)
                {
                    _pessoa.enderecos.Clear();
                    ctx.SaveChanges();
                }

                if (pessoa.enderecos == null)
                    throw new ApplicationNotFoundException(ApplicationNotFoundException.ENDERECO_NAO_ENCONTRADO);

                foreach (Endereco item in pessoa.enderecos)
                {
                    item.Validar();
                    Endereco _endereco = EnderecoService.Salvar(item);

                    if (_endereco == null)
                        throw new ApplicationNotFoundException(ApplicationNotFoundException.ENDERECO_NAO_ENCONTRADO);

                    //item.id_endereco = _endereco.id;
                    //item.id_pessoa = _pessoa.id;
                    _pessoa.enderecos.Add(item);
                }

                ctx.SaveChanges();
                return _pessoa;
            }
        }

        public static PaginacaoModel ListarPagina(int pagina)
        {
            using (Repositorio ctx = new Repositorio())
            {
                PaginacaoModel _pagina = new PaginacaoModel();

                _pagina.pagina_atual = (int)pagina;
                _pagina.quantidade_pagina = 10; //???
                int inicio = (pagina - 1) * _pagina.quantidade_pagina;

                List<Pessoa> pessoas = new List<Pessoa>();
                _pagina.quantidade_total = ctx.Pessoas.Count();
                pessoas = ctx.Pessoas.Include(a => a.enderecos)
                    .OrderBy(x => x.nome).Skip(inicio).Take(_pagina.quantidade_pagina).ToList();
                
                _pagina.total_paginas = Convert.ToInt32(Math.Ceiling((double)_pagina.quantidade_total / _pagina.quantidade_pagina));
                _pagina.conteudo = pessoas;

                return _pagina;
            }
        }


        public static bool Deletar(string pessoa_uuid)
        {
            List<Pessoa> erros = new List<Pessoa>();

            using (Repositorio ctx = new Repositorio())
            {
                Pessoa _pessoa = ctx.Pessoas.Where(a => a.cpf == pessoa_uuid).FirstOrDefault();

                if (_pessoa == null)
                {
                    return true;
                }
                List<Endereco> endereco = ctx.Enderecos.Where(x => x.id == _pessoa.id).ToList();
                if (endereco != null && endereco.Count > 0)
                {
                    foreach (Endereco item in endereco)
                    {
                        if (item.id == _pessoa.id)
                        {
                            ctx.Remove(item);
                            EnderecoService.Deletar(item.id);
                            //Endereco _endereco = ctx.Enderecos.Where(s => s.id == item.id_endereco).FirstOrDefault();
                            //ctx.Remove(_endereco);
                        }
                    }
                }
                Pessoa _pessoa_ = ctx.Pessoas.Where(a => a.id == _pessoa.id).FirstOrDefault();
                ctx.Remove(_pessoa_);
                ctx.SaveChanges();
                return true;
            }
        }

        //public static bool PatchFotoPerfil(string uuid, string foto_perfil)
        //{
        //    using (Repositorio ctx = new Repositorio())
        //    {

        //        List<Pessoa> _pessoa = ctx.Pessoas.ToList();
        //        if (_pessoa == null)
        //            throw new ApplicationBadRequestException(ApplicationNotFoundException.FUNCIONARIO_NAO_ENCONTRADO);

        //        _pessoa.ForEach(x => x.FotoPerfil = foto_perfil);
        //        ctx.SaveChanges();
        //        return true;
        //    }
        //}




    }
}