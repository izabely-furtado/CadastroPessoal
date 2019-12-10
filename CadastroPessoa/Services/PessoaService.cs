﻿using LinqKit;
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

        public static Pessoa Obter(int uuid)
        {
            using (Repositorio ctx = new Repositorio())
            {
                return ctx.Pessoas.Include(a => a.PessoaEnderecos).ThenInclude(a => a.Endereco)
                    .Where(a => a.id == uuid).FirstOrDefault();
            }
        }

        public static Pessoa ObterApiPessoa(int pessoa_uuid, int uuid)
        {
            using (Repositorio ctx = new Repositorio())
            {
                Pessoa _pessoa = ctx.Pessoas.Where(a => a.id == pessoa_uuid).FirstOrDefault();
                return ctx.Pessoas
                    .Include(a => a.PessoaEnderecos).ThenInclude(a => a.Endereco)
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
                if (_pessoa != null)
                    throw new ApplicationBadRequestException(ApplicationBadRequestException.FUNCIONARIO_EXISTENTE);


                _pessoa.nome = _pessoa.nome.ToUpper();
                _pessoa.sobrenome = _pessoa.sobrenome.ToUpper();
                if (_pessoa.Email != null)
                    _pessoa.Email = _pessoa.Email.ToLower();

                foreach (PessoaEndereco item in _pessoa.PessoaEnderecos)
                {
                    item.Validar();
                    Endereco _endereco = ctx.Enderecos.Where(a => a.id == item.id_endereco).FirstOrDefault();
                    if (_endereco == null)
                        throw new ApplicationNotFoundException(ApplicationNotFoundException.ENDERECO_NAO_ENCONTRADO);

                    item.id_endereco = _endereco.id;
                }

                RequisicaoHTTP requisicao = new RequisicaoHTTP();
                Pessoa pessoa = new Pessoa();
                pessoa.nome = pessoa.nome;
                pessoa.sobrenome = pessoa.sobrenome;
                pessoa.cpf = pessoa.cpf;
                pessoa.data_nascimento = pessoa.data_nascimento;


                string pessoaStr = JsonConvert.SerializeObject(pessoa);
                string pessoaEnvio = requisicao.Post("Pessoas", pessoaStr);
                Pessoa pessoaRetorno = JsonConvert.DeserializeObject<Pessoa>(pessoaEnvio);

                if (pessoaRetorno == null)
                    throw new ApplicationBadRequestException(ApplicationBadRequestException.ERRO_AO_CADASTRAR_PESSOA);
                pessoa.id = pessoa.id;
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
                    .Include(a => a.PessoaEnderecos).ThenInclude(a => a.Endereco)
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
                
                if (_pessoa.PessoaEnderecos != null && _pessoa.PessoaEnderecos.Count() > 0)
                {
                    _pessoa.PessoaEnderecos.Clear();
                    ctx.SaveChanges();
                }

                foreach (PessoaEndereco item in pessoa.PessoaEnderecos)
                {
                    item.Validar();
                    Endereco _endereco = ctx.Enderecos.Where(a => a.id == item.id_endereco).FirstOrDefault();

                    if (_endereco == null)
                        throw new ApplicationNotFoundException(ApplicationNotFoundException.ENDERECO_NAO_ENCONTRADO);

                    item.id_endereco = _endereco.id;
                    _pessoa.PessoaEnderecos.Add(item);
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

                ExpressionStarter<Pessoa> query = PredicateBuilder.New<Pessoa>(true);

                List<Pessoa> pessoas = new List<Pessoa>();

                _pagina.total_paginas = Convert.ToInt32(Math.Ceiling((double)_pagina.quantidade_total / _pagina.quantidade_pagina));
                _pagina.conteudo = pessoas;

                return _pagina;

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