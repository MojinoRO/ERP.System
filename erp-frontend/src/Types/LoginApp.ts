export interface loginRequest{
    NombreUsuario: string,
    ContraseñaUsuario : string,
}

export interface loginReponse{
    token: string
}