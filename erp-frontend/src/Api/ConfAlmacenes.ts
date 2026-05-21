import api from "../Api/AxiosConfig"
import {type ResponseAlmacenes } from "../Types/ConfAlmacenes"

export const ListarAlmacenesBD =async ():Promise<ResponseAlmacenes[]> =>{
    try{
        const Almacenes = await api.get("/ConfAlmaces");
        return Almacenes.data;
    }catch(error :any){
        return(error?.response.data);
    }
}