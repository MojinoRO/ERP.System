import api from "../Api/AxiosConfig";
import type { requestVendedores, responseVendedores } from "../Types/ConfVendedores";

export const GetVendedores = async (): Promise<responseVendedores[]> => {
  const response = await api.get("/ConfVendedores");
  const data = response.data;
  return data;
};

export const GetVendedoresByID = async (
  id: number,
): Promise<responseVendedores | null> => {
  try {
    const response = await api.get(`/ConfVendedores/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const CreateVendedores = async(
  data:responseVendedores
):Promise<boolean> =>{

  try{
    const response = await api.post("/ConfVendedores",data)
    return response.status===201 ||response.status ===200

  }catch(error :any){
    console.log(error.response.data);
    return false;
  }

}

export const UpdatVendedores = async (data:responseVendedores):Promise<boolean>=>{
  try{
    const update = await api.put(`/ConfVendedores/${data.vendedorID}`,data)
    return update.status === 200 || update.status ===201;
  }
  catch(error){
    console.log(error)
    return false;
  }
}

export const deleteVendedores= async(data:responseVendedores) :Promise<boolean>=>{
  try{
    const eliminar = await api.delete(`/ConfVendedores/${data.vendedorID}`);
    return eliminar.status ===200 || eliminar.status===201;
  }catch(error:any){
    console.log(error.response.data);
    return false;
  }
}