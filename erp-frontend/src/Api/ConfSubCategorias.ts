import api from "../Api/AxiosConfig";
import { type SubCategoriasResponse } from "../Types/ConfSubCategorias";

export const GetAllSubCategorias = async (): Promise<
  SubCategoriasResponse[]
> => {
  const subcategorias = await api.get("/ConfSubCategorias");
  const data = subcategorias.data;
  return data;
};

export const Validate = async(codigo : string) : Promise<boolean> =>{
  try{
    const valide = await api.get(`/ConfSubCategorias/codigo/${codigo}`)
    return valide.status >= 200 || valide.status <300
  }catch(error:any){
    console.log(error.response.data);
    return false;
  }
}

export const deleteSubcategorias = async (id : number) : Promise<boolean> =>{
  try{
    const eliminar  = await api.delete(`/ConfSubCategorias/id/${id}`)
    return eliminar.status >=200 || eliminar.status < 300 
  }catch(error:any){
    console.log(error.response.data)
    return false;
  }
}