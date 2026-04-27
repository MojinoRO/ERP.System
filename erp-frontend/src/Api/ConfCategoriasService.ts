import api from "./AxiosConfig"
import { type CategoriasResponse } from "../Types/ConfCategorias"   

export const getAllCategorias= async () : Promise<CategoriasResponse[]> =>{
    const categorias  = await api.get("/ConfCategorias");
    const data = categorias.data;
    return data;
}

export const getByCodigo = async (codigo:string) : Promise<boolean> =>{
    try{
        const categoria = await api.get(`/ConfCategorias/codigo/${codigo}`);
        if(!categoria)return false;
        return categoria.status ==200 || categoria.status==201
    }catch(error :any){
        console.log(error.response.data);
        return false;
    }
}