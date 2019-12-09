using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace CadastroPessoa.Util
{

    /* Adicionar em Configure
     if (env.IsDevelopment()) {
     app.UseDeveloperExceptionPage();
     app.UseNusaExceptionMiddleware();}
     else {          
     app.UseNusaExceptionMiddleware();
     app.UseExceptionHandler(); } 
     */
    public class NusaExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<NusaExceptionMiddleware> _logger;

        public class MessageException
        {
            public string mensagem { get; set; }
        }

        public NusaExceptionMiddleware(RequestDelegate next, ILoggerFactory loggerFactory)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
            _logger = loggerFactory?.CreateLogger<NusaExceptionMiddleware>() ?? throw new ArgumentNullException(nameof(loggerFactory));
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (ApplicationBadRequestException ex)
            {
                if (context.Response.HasStarted)
                {
                    _logger.LogWarning("The response has already started, the http status code middleware will not be executed.");
                    throw;
                }

                context.Response.Clear();
                context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                context.Response.StatusCode = 400;
                context.Response.ContentType = @"application/json";
                MessageException mensagem = new MessageException();
                mensagem.mensagem = ex.Message;
                JsonConvert.SerializeObject(mensagem);
                await context.Response.WriteAsync(JsonConvert.SerializeObject(mensagem));
                return;
            }

            catch (ArgumentNullException ex)
            {
                if (context.Response.HasStarted)
                {
                    _logger.LogWarning("The response has already started, the http status code middleware will not be executed.");
                    throw;
                }

                context.Response.Clear();
                context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                context.Response.StatusCode = 400;
                context.Response.ContentType = @"application/json";
                MessageException mensagem = new MessageException();
                mensagem.mensagem = ex.Message;
                JsonConvert.SerializeObject(mensagem);
                await context.Response.WriteAsync(JsonConvert.SerializeObject(mensagem));
                return;
            }

            catch (ApplicationNotFoundException ex)
            {
                if (context.Response.HasStarted)
                {
                    _logger.LogWarning("The response has already started, the http status code middleware will not be executed.");
                    throw;
                }

                context.Response.Clear();
                context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                context.Response.StatusCode = 404;
                context.Response.ContentType = @"application/json";
                MessageException mensagem = new MessageException();
                mensagem.mensagem = ex.Message;
                JsonConvert.SerializeObject(mensagem);
                await context.Response.WriteAsync(JsonConvert.SerializeObject(mensagem));
                return;
            }

            catch (Exception ex)
            {
                if (context.Response.HasStarted)
                {
                    _logger.LogWarning("The response has already started, the http status code middleware will not be executed.");
                    throw;
                }

                context.Response.Clear();
                context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                context.Response.StatusCode = 500;
                context.Response.ContentType = @"application/json";
                MessageException mensagem = new MessageException();
                mensagem.mensagem = ex.Message;
                JsonConvert.SerializeObject(mensagem);
                await context.Response.WriteAsync(JsonConvert.SerializeObject(mensagem));
                return;
            }
        }
    }


    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class NusaExceptionMiddlewareExtensions
    {
        public static IApplicationBuilder UseNusaExceptionMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<NusaExceptionMiddleware>();
        }
    }
}