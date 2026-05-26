using ERP.Application.Services;

namespace ERP.Application.common
{
    public class ServiceResponse<T>
    {
        public bool Success {get;set;}
        public string Message {get;set;} =string.Empty;
        public T? Data {get;set;}

        public static ServiceResponse<T>Ok(T data , string message = "")
        {
            return new ServiceResponse<T>
            {
                Success= true,
                Message= message,
                Data= data,
            };
        }

        public static ServiceResponse<T>Error(string message = "")
        {
            return new ServiceResponse<T>
            {
                Success = false,
                Message=message
            };
        }
    }
}