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

            //entity to dto sin fk
            CreateMap<ConfMarcas,ConfMarcasDto>();

            //DTO to entity
            CreateMap<CreateSubCategeriasDTOs,ConfSubCategorias>();
            CreateMap<UpdateSubCategeriasDTOs,ConfSubCategorias>();
            CreateMap<CreateConfMarcasDto,ConfMarcas>();
            CreateMap<UpdateConfMarcasDto,ConfMarcas>();
        }
    }
}