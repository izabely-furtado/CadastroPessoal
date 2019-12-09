using ApiCliente.Models;
using ApiCliente.Models.Response;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using CadastroPessoa.Services;
using System.Collections.Generic;

namespace ApiCliente.Controllers
{
    [Route("v1/api/[controller]")]
    [ApiController]
    public class EstadosController : ApiClienteController
    {
        public EstadosController(IMapper mapper, IOptions<AppSettings> appSettings, IOptions<TokenSettings> tokenSetting)
            : base(mapper, appSettings, tokenSetting) { }

        [HttpGet]
        public ActionResult<List<EstadoResponse>> Listar()
        {
            return Ok(_mapperResponse.Map<List<EstadoResponse>>(EstadoService.Listar()));
        }

        [HttpGet("{id}")]
        public ActionResult<EstadoResponse> Obter(int uuid)
        {
            return Ok(_mapperResponse.Map<EstadoResponse>(EstadoService.Obter(uuid)));
        }

        [HttpGet("{id}/Cidades")]
        public ActionResult<List<CidadeResponse>> ObterCidades(int uuid)
        {
            return Ok(_mapperResponse.Map<List<CidadeResponse>>(EstadoService.ObterCidades(uuid)));
        }
    }
}
