using ApiCliente.Models;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using CadastroPessoa.Persistencia;
using CadastroPessoa.Util;
using Swashbuckle.AspNetCore.Swagger;
using System.Linq;
using System.Text;

namespace ApiCliente
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //AutoMapper
            services.AddAutoMapper();

            //Acessando o TokenSettings
            var tokenSettingsSection = Configuration.GetSection("TokenSettings");
            services.Configure<TokenSettings>(tokenSettingsSection);

            //Acessando o AppSetting
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            var tokenSettings = tokenSettingsSection.Get<TokenSettings>();
            byte[] key = Encoding.ASCII.GetBytes(tokenSettings.Secret);


            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Cadastro de Pessoal", Version = "v1" });
             //   c.OperationFilter<AddRequiredHeaderParameter>();
                c.DescribeAllEnumsAsStrings();
            });

            Repositorio.ConnectionString = Configuration.GetConnectionString("repositorio");

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddMvc().AddJsonOptions(o =>
            {
                o.SerializerSettings.ContractResolver = new SnakecaseContractResolver();
                o.SerializerSettings.Converters.Add(new StringEnumConverter());
                o.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;                
                o.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                o.SerializerSettings.MissingMemberHandling = MissingMemberHandling.Ignore;
                o.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //JWT
            app.UseAuthentication();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseExceptionMiddleware();
            }
            else
            {
                app.UseHsts();                
                app.UseExceptionMiddleware();
            }

            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials());

            app.UseHttpsRedirection();
            app.UseMvc();
            app.UseStaticFiles();            

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Cadastro de Pessoal - Cliente");
            });

        }

        //to lowcase
        public class LowercaseContractResolver : DefaultContractResolver
        {
            protected override string ResolvePropertyName(string propertyName)
            {
                return propertyName.ToLower();
            }
        }

        public class SnakecaseContractResolver : DefaultContractResolver
        {
            protected override string ResolvePropertyName(string str)
            {
                return string.Concat(str.Select((x, i) => i > 0 && char.IsUpper(x) ? "_" + x.ToString() : x.ToString())).ToLower();
            }
        }
    }
}
