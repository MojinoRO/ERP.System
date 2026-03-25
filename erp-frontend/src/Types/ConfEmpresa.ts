// Lo que la API devuelve (GET)
export interface ConfEmpresa {
  empresaID: number;
  empresaNit: string;
  empresaNombre: string;
}

// Lo que enviamos para CREAR (POST)
export interface CreateConfEmpresa {
  empresaNit: string;
  empresaNombre: string;
}
// Lo que enviamos para ACTUALIZAR (PUT)
export interface UpdateConfEmpresa {
  empresaID: number;
  empresaNit: string;
  empresaNombre: string;
}
