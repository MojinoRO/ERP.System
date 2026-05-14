import api from "../Api/AxiosConfig"
import {type responseMarcas} from "../Types/ConfMarcas"

export const ListarMarcas = async():Promise<responseMarcas[]>=>{
    const marcas = await api.get("/ConfMarcas")
    return marcas.data;
}

export const BuscadorMarcas = async(nombre:string) : Promise<responseMarcas[]>=>{
    try {
        const marcas = await api.get(`/ConfMarcas/nombre/${nombre}`)
        const data = marcas.data;
        return data;
    } catch (error: any) {
        console.log(error);
        return []
    }
}