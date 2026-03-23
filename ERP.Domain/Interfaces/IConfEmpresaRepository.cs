using ERP.Domain.Entities;


namespace ERP.Domain.interfaces;

public interface IConfEmpresaRepository
{
    // LEER LAS QUE EXISTEN 
    Task<IEnumerable<ConfEmpresa>>GetAllAsync();

    //Leer por ID
    Task<ConfEmpresa?>GetByIdAsync(int id);

    //CREATE
    Task<ConfEmpresa>CreateAsync(ConfEmpresa empresa);

    //UPDATE
    Task<ConfEmpresa?>UpdateAsync(ConfEmpresa empresa);

    //DELETE
    Task<bool> DeleteAsync (int id);
}