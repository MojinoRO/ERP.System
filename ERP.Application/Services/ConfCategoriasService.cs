using System.Formats.Asn1;
using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using ERP.Domain.Interfaces;

namespace ERP.Application.Services
{
    public class ConfCategoriasService : IConfCategoriasServices
    {
        private readonly IConfCatagoriasRepository _repository;
        public ConfCategoriasService(IConfCatagoriasRepository repository)=> _repository= repository;

        public async Task<IEnumerable<ConfCategoriasDto>> getAllAsync()
        {
            var categorias = await _repository.getAllAsync();
            return categorias.Select(c => new ConfCategoriasDto
            {
                CategoriaID=c.CategoriasID,
                CategoriaCodigo=c.CategoriaCodigo,
                CategoriaNombre=c.CategoriaNombre,
                ImpuestoACargo=c.ImpuestoACargo,
                TarifaImpuesto=c.TarifaImpuesto,
                Estado=c.Estado
            });
        }

        public async Task<ConfCategoriasDto?>getByIdAsync(int id)
        {
            var categoria = await _repository.getByIDAsync(id);
            if(categoria == null)return null;
            return new ConfCategoriasDto
            {
                CategoriaID=categoria.CategoriasID,
                CategoriaCodigo=categoria.CategoriaCodigo,
                CategoriaNombre=categoria.CategoriaNombre,
                ImpuestoACargo=categoria.ImpuestoACargo,
                TarifaImpuesto=categoria.TarifaImpuesto,
                Estado=categoria.Estado,
            };
        }

        public async Task<ConfCategoriasDto?>getByCodigoAsync(string codigo)
        {
            var categoria = await _repository.getByCodigoAsync(codigo);
            if(categoria == null)return null;
            return new ConfCategoriasDto
            {
                CategoriaID=categoria.CategoriasID,
                CategoriaCodigo=categoria.CategoriaCodigo,
                CategoriaNombre=categoria.CategoriaNombre,
                ImpuestoACargo=categoria.ImpuestoACargo,
                TarifaImpuesto=categoria.TarifaImpuesto,
                Estado=categoria.Estado,
            };
        }
    }
}