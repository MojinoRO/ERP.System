import api, {} from "../Api/AxiosConfig"

export const getUsuarios = async () =>{
    const response = await api.get("/ConfUsuarios");
    return response.data;
}


export const loginUser =async(data:{
    nombreUsuario : string;
    contraseñaUsuario :string;
}) => {
    const response = await api.post("/ConfUsuarios/login",data);
    return response.data;   
}