using ApiCliente.Models;
using ApiCliente.Models.Request;
using ApiCliente.Models.Response;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using CadastroPessoa.Entities;

namespace ApiCliente.Controllers
{
    public class ApiClienteController : ControllerBase
    {
        protected readonly AppSettings _appSettings;
        protected readonly TokenSettings _tokenSettings;
        protected IMapper _mapperRequest;
        protected IMapper _mapperResponse;

        public ApiClienteController(IMapper mapper, IOptions<AppSettings> appSettings, IOptions<TokenSettings> tokenSettings)
        {

            var configRequest = new MapperConfiguration(cfg =>
            {
                cfg.SourceMemberNamingConvention = new LowerUnderscoreNamingConvention();
                cfg.DestinationMemberNamingConvention = new PascalCaseNamingConvention();

                cfg.CreateMap<EnderecoRequest, Endereco>().IgnoreAllPropertiesWithAnInaccessibleSetter();
                cfg.CreateMap<PessoaRequest, Pessoa>().IgnoreAllPropertiesWithAnInaccessibleSetter();
            });

            var configResponse = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Cidade, CidadeResponse>().IgnoreAllPropertiesWithAnInaccessibleSetter();
                cfg.CreateMap<Estado, EstadoResponse>().IgnoreAllPropertiesWithAnInaccessibleSetter();
                cfg.CreateMap<Endereco, EnderecoResponse>().IgnoreAllPropertiesWithAnInaccessibleSetter();
                cfg.CreateMap<Pessoa, PessoaResponse>().IgnoreAllPropertiesWithAnInaccessibleSetter();
      
                //cfg.CreateMap<Pessoa, PessoaResponse>()
                //.ForMember(dest => dest.foto_perfil_link, opts => opts.MapFrom(src => appSettings.Value.ApiPresenca + "/File/" + "/Perfil/" + src.FotoPerfil));

            });

            _mapperResponse = new Mapper(configResponse);
            _mapperRequest = new Mapper(configRequest);
            _appSettings = appSettings.Value;
            _tokenSettings = tokenSettings.Value;
        }

        
       
    }
}
