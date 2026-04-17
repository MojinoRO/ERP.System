export interface loginRequest{
    NombreUsuario: string,
    ContraseñaUsuario : string,
}

export interface loginReponse{
    usuarioNombre: string
    usuarioID: number
}