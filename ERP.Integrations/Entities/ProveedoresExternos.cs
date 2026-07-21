namespace ERP.Integrations.Entities;

//UBICAICONES => RUTAS
public class Ubicaciones
{
    public int UbicacionID{get;set;}
    public string UbicacionCodigo{get;set;}=string.Empty;
    public string UbicacionNombre{get;set;}=string.Empty;
}

public class Zonas
{
    public int ZonasID {get;set;}
    public string ZonasCodigo {get; set;} =string.Empty;
    public string ZonasNombre{get;set;}=string.Empty;
}

public class Articulos
{
    public int ArticulosID{get;set;}
    public string ArticulosCodigo{get;set;}=string.Empty;
    public string ArticulosNombre{get;set;}=string.Empty;
    public decimal ArticulosCosto{get;set;}
}

public class ProveedoresExternos
{
    public int TercerosID {get;set;}
    public string TercerosIdentificacion{get;set;}=string.Empty;
    public string TercerosNombres{get;set;}=string.Empty;
    public string TercerosCodigoAlterno{get;set;}=string.Empty;
    public string TercerosCelular{get;set;}=string.Empty;
    public string TercerosObservaciones{get;set;}=string.Empty;
    public int  ZonasID {get; set;}
}

public class Documentos
{
    public int DocumentosID{get;set;}
    public string DocumentosCodigo{get;set;}=string.Empty;
    public string DocumentosNombre{get;set;}=string.Empty;
}

public class InvCompraBloque
{
    public DateTime Fecha {get;set;}
    public int ArticulosID {get;set;}
    public decimal Costo {get;set;}
    public decimal Cantidad {get;set;}
    public int ProveedorID {get;set;}
    public int TransportadorID {get;set;}
    public int UbicacionID {get;set;}
    public int ZonasID{get;set;}
    public int DocumentosID {get;set;}
    public string Automatica{get;set;}=string.Empty;
    public decimal Numero{get;set;}
    public int? CompraID{get;set;}
    public decimal Porcentaje {get;set;}
}