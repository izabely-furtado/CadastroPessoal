using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using CadastroPessoa.Entities;
using CadastroPessoa.Util;

namespace ApiCliente.Controllers
{
    [Route("v1/api/[controller]")]
    [ApiController]    
    public class TestesController : ControllerBase
    {
        [HttpGet()]
        public ActionResult<string> Obter()
        {
            RequisicaoHTTP requisicao = new RequisicaoHTTP();
            Pessoa pessoa = new Pessoa();
            var aaa = JsonConvert.SerializeObject(pessoa);

            string aa = requisicao.Post("Pessoas", "{\"nome\":\"bia\",\"sobrenome\":\"bia\",\"cpf\":\"33129386009\",\"data_nascimento\":\"2000-07-31T17:27:50.823Z\",\"ativo\":true,\"sistema_uuid\":\"a66d6f8a-d9df-46f5-a86b-fbdc62bd2966\"}");

            Pessoa aaaa = JsonConvert.DeserializeObject<Pessoa>(aa);

            return Ok(requisicao.Get("Pessoas"));
        }
    }
}