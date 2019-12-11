using ApiCliente.Models;
using ApiCliente.Models.Request;
using ApiCliente.Models.Response;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using CadastroPessoa.Entities;
using CadastroPessoa.Models;
using CadastroPessoa.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static CadastroPessoa.Services.PessoaService;

namespace ApiCliente.Controllers
{
    [Route("v1/api/[controller]")]
    [ApiController]
    public class EnderecoController : ApiClienteController
    {
        public EnderecoController(IMapper mapper, IOptions<AppSettings> appSettings, IOptions<TokenSettings> tokenSetting)
           : base(mapper, appSettings, tokenSetting) { }

        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(_mapperResponse.Map<List<EnderecoResponse>>(EnderecoService.Listar()));
        }

        [HttpGet("{id}")]
        public ActionResult<PessoaResponse> Obter(int uuid)
        {
            return Ok(_mapperResponse.Map<EnderecoResponse>(EnderecoService.Obter(uuid)));
        }

        [HttpPost]
        public ActionResult<EnderecoResponse> Salvar([FromBody] PessoaRequest funcionarioRequest)
        {
            Endereco pessoa = _mapperRequest.Map<Endereco>(funcionarioRequest);
            return Ok(_mapperResponse.Map<EnderecoResponse>(EnderecoService.Salvar(pessoa)));
        }

        [HttpDelete("{id}")]
        public ActionResult DeletarEndereco(int uuid)
        {
            return Ok(EnderecoService.Deletar(uuid));
        }


        //[HttpPatch("{id}/FotoPerfil")]
        //public ActionResult PatchFotoPerfil(string uuid, string foto_perfil)
        //{
        //    return Ok(PessoaService.PatchFotoPerfil( uuid, foto_perfil));
        //}

    }
}
