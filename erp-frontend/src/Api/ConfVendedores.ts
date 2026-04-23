import api from "../Api/AxiosConfig"
import type {requestVendedores, responseVendedores} from "../Types/ConfVendedores"

export const GetVendedores = async():Promise<responseVendedores[]> =>{
    const response = await api.get("/ConfVendedores")
    const data =response.data;
    return data;
}

export const GetVendedoRByID = async(data:requestVendedores):Promise<void> =>{
    const response = await api.get(`/ConfVendedores/${data.VendedorID}`)
    const VendedorID= response.data;
    console.log(VendedorID)
    return VendedorID;
}