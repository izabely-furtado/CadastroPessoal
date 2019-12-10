using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Collections.Generic;

namespace ApiCliente.Filter
{
    public class AddRequiredHeaderParameter : IOperationFilter
    {
        public void Apply(Operation operation, OperationFilterContext context)
        {
            if (operation.Parameters == null)
                operation.Parameters = new List<IParameter>();

            operation.Parameters.Add(new HeaderParameter()
            {
                Name = "Authorization",
                In = "header",
                Type = "string",
                Required = false
            });

            if (operation.OperationId.ToLower() == "ApiV1FilesUploadPost".ToLower())
            {
                operation.Parameters.Clear();
                operation.Parameters.Add(new HeaderParameter
                {
                    Name = "uploadedFile",
                    In = "formData",
                    Description = "Upload File",
                    Type = "type",
                    Required = true,
                });
                operation.Consumes.Add("multipart/form-data");
            }
        }

        class HeaderParameter : NonBodyParameter
        {
        }
    }
}
