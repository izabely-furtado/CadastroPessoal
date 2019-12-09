using Newtonsoft.Json;
using RestSharp;

namespace CadastroPessoa.Util
{
    public class RequisicaoHTTP
    {
        private string Url;
        // RestClient client;
        //string bearer = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ijc1YjZjMDJhLTgwMjYtNDkwZC04NjVlLWZjOGUzOTYyMWMwZSIsImRvbWFpbiI6IlJFR1VMQUNBTyIsImNvZGUiOiIiLCJ0eXBlIjoiQURNSU4iLCJuYmYiOjE1NTY1OTU5MzcsImV4cCI6MTU4ODEzMTkzNywiaWF0IjoxNTU2NTk1OTM3LCJpc3MiOiJSRUdVTEFDQU9fU0FNVSJ9.2Rqp8V-ypxIBynB4h0GaOq134tGb-55Q9qswLeKjPLs";

        private static string _urlBase = "http://apipresenca.nusacontrol.com.br/v1/api/";
      
        ////api/v1/Attributes
        public RequisicaoHTTP()
        {
            this.Url = _urlBase;
        }
        public string Post(string resource, string boby)
        {
            //string accessToken = Autenticacao();
            RestClient client = new RestClient(Url);
            RestRequest request = new RestRequest(resource, Method.POST);
            request.AddHeader("content-type", "application/json");
            request.AddParameter("undefined", boby, ParameterType.RequestBody);

            IRestResponse response = client.Execute(request);
            if (response.IsSuccessful)
            {
                return response.Content.ToString();
            }
            throw new System.Exception("Erro na requisicao");
        }

        public string Get(string resource)
        {
            //string accessToken = Autenticacao();
            var client = new RestClient(Url);
            var request = new RestRequest(resource, Method.GET);
            request.AddHeader("content-type", "application/json");
            IRestResponse response = client.Execute(request);
            if (response.IsSuccessful)
            {
                return response.Content.ToString();
            }
            throw new System.Exception("Erro na requisicao");
        }
        
    }
}
