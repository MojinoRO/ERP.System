export interface loginRequest{
    NombreUsuario: string,
    ContraseñaUsuario : string,
}

export interface loginReponse{
    UsuarioNombre: string
    UsuarioID: number
}