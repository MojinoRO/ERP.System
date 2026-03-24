// Lo que la API devuelve (GET)
export interface ConfEmpresa {
  EmpresaID: number;
  EmpresaNit: string;
  EmpresaNombre: string;
}

// Lo que enviamos para CREAR (POST)
export interface CreateConfEmpresa {
  EmpresaNit: string;
  EmpresaNombre: string;
}
// Lo que enviamos para ACTUALIZAR (PUT)
export interface UpdateConfEmpresa {
  EmpresaID: number;
  EmpresaNit: string;
  EmpresaNombre: string;
}
