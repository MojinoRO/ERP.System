export interface loginRequest{
    NombreUsuario: string,
    ContraseñaUsuario : string,
}

export interface loginReponse{
    nombreUsuario: string
    usuarioID: number
}