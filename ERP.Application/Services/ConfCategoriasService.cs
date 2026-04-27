using ERP.Application.DTOs;
using ERP.Application.Interfaces;
using ERP.Domain.Interfaces;
using ERP.Domain.Entities;

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

        public async Task<ConfCategoriasDto>CreateAsync(CreateConfCategoriasDto dto)
        {
            if(dto == null)
                throw new ArgumentException("No hay datos para crear");
            if(string.IsNullOrEmpty(dto.CategoriaCodigo))
                throw new ArgumentException("Codigo Invalido");
            if(string.IsNullOrEmpty(dto.CategoriaNombre))
                throw new ArgumentException("Nombre Requerido");
            var request = await _repository.getByCodigoAsync(dto.CategoriaCodigo);
            if(request!= null)
                throw new ArgumentException("Codigo de Categoria Ya Existe");

            var crearNew = new ConfCategorias
            {
                CategoriaCodigo=dto.CategoriaCodigo,
                CategoriaNombre=dto.CategoriaNombre,
                ImpuestoACargo= dto.ImpuestoACargo,
                TarifaImpuesto=dto.TarifaImpuesto,
                Estado=dto.Estado
            };

            await _repository.CreateAsync(crearNew);

            return new ConfCategoriasDto
            {
                CategoriaCodigo=crearNew.CategoriaCodigo,
                CategoriaNombre=crearNew.CategoriaNombre,
                ImpuestoACargo=crearNew.ImpuestoACargo,
                TarifaImpuesto=crearNew.TarifaImpuesto,
                Estado=crearNew.Estado
            };
        }
        public async Task<ConfCategoriasDto> UpdateAsync(int id, UpdateConfCategoriasDto dto)
        {
            var categoria = await _repository.getByIDAsync(id);

            if (categoria == null)
                throw new Exception("La categoría no existe");

            // Actualizar campos
            categoria.CategoriaCodigo = dto.CategoriaCodigo;
            categoria.CategoriaNombre = dto.CategoriaNombre;
            categoria.ImpuestoACargo = dto.ImpuestoACargo;
            categoria.TarifaImpuesto = dto.TarifaImpuesto;
            categoria.Estado = dto.Estado;

            await _repository.UpdateAsync(categoria);

            return new ConfCategoriasDto
            {
                CategoriaCodigo = categoria.CategoriaCodigo,
                CategoriaNombre = categoria.CategoriaNombre,
                ImpuestoACargo = categoria.ImpuestoACargo,
                TarifaImpuesto = categoria.TarifaImpuesto,
                Estado = categoria.Estado
            };
        }
        public async Task<bool>DeleteAsync(int id)
        {
            if(id == 0)
                throw new ArgumentException("Id a eliminar no existe");
           return await _repository.DeleteAsync(id);
        }
    }
}