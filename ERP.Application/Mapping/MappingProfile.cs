using AutoMapper;
using ERP.Domain.Entities;
using ERP.Application.DTOs;

namespace ERP.Application.Mapping
{
    public class MapppingProfile: Profile
    {
        public MapppingProfile()
        {
            //entity to DTO con fk
            CreateMap<ConfSubCategorias,ConfSubCategeriasDTOs>().ForMember(
                dest => dest.CategoriaCodigo,
                opt =>opt.MapFrom(src => src.ConfCategorias.CategoriaCodigo)
            ). ForMember(
                dest =>dest.CategoriaNombre,
                opt => opt.MapFrom(src =>src.ConfCategorias.CategoriaNombre)
            );

            CreateMap<ConfDepartamentos,ConfDepartamentosDTO>().ForMember(
                desk => desk.PaisCodigo,
                opt =>opt.MapFrom(src => src.ConfPais.CodigoPais)
            ).ForMember(
                desk => desk.PaisNombre,
                opt => opt.MapFrom(src => src.ConfPais.NombrePais)
            );
            //entity to dto sin fk
            CreateMap<ConfMarcas,ConfMarcasDto>();
            CreateMap<ConfAlmacenes,ConfAlmacenDTO>();
            CreateMap<ConfPais,ConfPaisDto>();
            //DTO to entity
            CreateMap<CreateSubCategeriasDTOs,ConfSubCategorias>();
            CreateMap<UpdateSubCategeriasDTOs,ConfSubCategorias>();
            CreateMap<CreateConfMarcasDto,ConfMarcas>();
            CreateMap<UpdateConfMarcasDto,ConfMarcas>();
            CreateMap<UpdateConfAlmacenDTO,ConfAlmacenes>();
            CreateMap<CreateConfAlmacenDTO,ConfAlmacenes>();
            CreateMap<CreateConfPaisDtos,ConfPais>();
            CreateMap<UpdateConfPaisDtos,ConfPais>();
            CreateMap<CreateConfDepartamentosDTO,ConfDepartamentos>();
            CreateMap<UpdateConfDepartamentosDTO,ConfDepartamentos>();
        }
    }
}