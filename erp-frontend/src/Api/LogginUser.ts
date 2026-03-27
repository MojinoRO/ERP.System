import api, {} from "../Api/AxiosConfig"

export const getUsuarios = async () =>{
    const response = await api.get("/ConfUsuarios");
    return response.data;
}

