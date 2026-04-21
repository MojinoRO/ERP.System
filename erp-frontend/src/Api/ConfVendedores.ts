import api from "../Api/AxiosConfig"
import type {responseVendedores} from "../Types/ConfVendedores"

export const GetVendedores = async():Promise<responseVendedores[]> =>{
    const response = await api.get("/ConfVendedores")
    const data =response.data;
    return data;
}