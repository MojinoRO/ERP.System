export interface CategoriasRequest {
  categoriasID: number;
  categoriasodigo: string;
  categoriaNombre: string;
  impuestoACargo: number;
  tarifaImpuesto: number;
  estado: number;
}
export interface CategoriasResponse {
  categoriaID: number;
  categoriaCodigo: string;
  categoriaNombre: string;
  impuestoACargo: number;
  tarifaImpuesto: number;
  estado: number;
}
