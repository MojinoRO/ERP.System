using System.ComponentModel.DataAnnotations;

namespace ERP.Application.common
{
    public static class ServiceValidate
    {
        public static bool ValidateRequired(object dto)
        {
            if(dto == null)return false;
            
            var propertyes = dto.GetType().GetProperties();
            foreach(var property in propertyes)
            {
                var requerid = Attribute.IsDefined(property,typeof(RequiredAttribute));
                if(!requerid)
                    continue;
                var value = property.GetValue(dto);
                if(value == null) return false;
                if(property.PropertyType == typeof(string)&&
                    string.IsNullOrWhiteSpace(value.ToString()))
                    return false;
            }
            return true;
        }

       public static string? ValidateRangoFechas(DateOnly desde, DateOnly hasta)
        {
            if (desde == default)
                return "Fecha desde";
            if (hasta == default)
                return "Fecha hasta";
            if (desde > hasta)
                return "La fecha desde no puede ser mayor que la fecha hasta.";
            return null;
        }
    }
}