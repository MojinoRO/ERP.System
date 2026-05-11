  import React, { useEffect, useState, type AnyActionArg } from "react";
  import s from "./shared.module.css";
  import {
    BtnEdit,
    BtnEliminar,
    BtnSave,
    BtonCrear,
  } from "../Components/component";
  import type { SubCategoriasResponse } from "../Types/ConfSubCategorias";
  import { deleteSubcategorias, GetAllSubCategorias } from "../Api/ConfSubCategorias";
  import { type CategoriasResponse } from "../Types/ConfCategorias";
  import { getAllCategorias } from "../Api/ConfCategoriasService";
import { FaSleigh } from "react-icons/fa";

  export default function ConfFormSubCategorias() {

    const emptySubCategorias: SubCategoriasResponse = {
      subCategoriaID: 0,
      categoriaID: 0,
      categoriaCodigo: "",
      categoriaNombre: "",
      subCategoriaCodigo: "",
      subCategoriaNombre: "",
      estado: 0,
    };

    const ValideteCampos = (c :CategoriasResponse)=>{
      if(!c.categoriaCodigo?.trim()){
        alert("Codigo Vacío")
        return false;
      }
      if(!c.categoriaNombre?.trim()){
        alert("Nombre Vacío")
        return false;
      }
      return true
    }

    const valideteCodigo = async():Promise<boolean>=>{
      try{

        
      }catch(error:any){
        console.log(error.response.data) 
      }
    }

    const [formState, setFormState] = useState<"lectura" | "edicion">("lectura");
    const [listadoSubcategorias, setListaSubCategorias] = useState<
      SubCategoriasResponse[]
    >([]);

    const [ListadoCategorias, setListadoCategorias] = useState<
      CategoriasResponse[]
    >([]);

    const [subCategoriaSelected, setSubCategoriaSelected] =
      useState(emptySubCategorias);

    const ListarSubCategorias = async () => {
      try {
        const data = await GetAllSubCategorias();
        setListaSubCategorias(data);
      } catch (error: any) {
        return console.log("Error al cargar SubCategorias", error.response?.data);
      }
    };
    useEffect(() => {
      ListarSubCategorias();
    }, []);

    const HandledChanged = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
      const { name, value } = e.target;
      setSubCategoriaSelected({
        ...subCategoriaSelected,
        [name]:
          name === "categoriaID" || name === "estado"
            ? Number(value)
            : value.toUpperCase(),
      });
    };

    const HandledCreate = async () => {
      try {
        const categorias = await getAllCategorias();
        setListadoCategorias(categorias);
        setFormState("edicion");
        setSubCategoriaSelected(emptySubCategorias);
      } catch (error: any) {
        return console.log(error.response.data);
      }
    };

    const HandledEdit = async() =>{
      if(subCategoriaSelected.subCategoriaID ==0) return alert("Debe seleccionar Subcategoría a Modificar")
      try{
        setFormState("edicion")
        const categorias = await getAllCategorias();
        setListadoCategorias(categorias)
      }catch(error :any){
        return console.log(error.response.data)
      }
    }

    const HandledEliminar = async() =>{
      if(subCategoriaSelected.subCategoriaID == 0)return alert("Debe seleccionar Subcategoría a Eliminar")
        try{
          const ok = window.confirm("¿Eliminar categoría?")
          if(!ok) return;
          const eliminar = await deleteSubcategorias(subCategoriaSelected.subCategoriaID);
          if (!eliminar) {
            alert("No se pudo eliminar categoria");
          } else {
            alert("Categoria Eliminada correctamente");
            ListarSubCategorias();
          } 
      }catch(error:any){
        return console.log(error.response.data)
      }
    }
    return (
      <div className={s.container}>
        <h2 className={s.pageTitle}>Subcategorías de artículos</h2>

        <div className={s.grid}>
          <div className={s.formulario}>
            <fieldset className={s.fieldset} disabled={formState === "lectura"}>
              <h3 className={s.sectionTitle}>Información general</h3>
              <div className={`${s.formRow} ${s.cols2}`}>
                <div className={s.formGroup}>
                  <label className={s.label}>Categoria</label>

                  {formState === "lectura" ? (
                    <input
                      className={s.input}
                      disabled
                      value={`${subCategoriaSelected.categoriaCodigo} ${subCategoriaSelected.categoriaNombre}`}
                    ></input>
                  ) : (
                    <select
                      name="categoriaID"
                      className={s.select}
                      value={subCategoriaSelected.categoriaID}
                      onChange={HandledChanged}
                    >
                      <option value={0}>Seleccione Categoria</option>
                      {ListadoCategorias.map((c) => (
                        <option key={c.categoriaID} value={c.categoriaID}>
                          {c.categoriaCodigo} -{""}
                          {c.categoriaNombre}
                        </option>
                      ))}
                    </select>
                  )}
                  <label className={s.label}>Código</label>
                  <input
                    className={s.input}
                    value={subCategoriaSelected.subCategoriaCodigo}
                    onChange={HandledChanged}
                    name="subCategoriaCodigo"
                  ></input>

                  <label className={s.label}>Nombre Subcategoría</label>
                  <input
                    className={s.input}
                    value={subCategoriaSelected.subCategoriaNombre}
                    onChange={HandledChanged}
                    name="subCategoriaNombre"
                  ></input>

                  <label className={s.label}>Estado</label>
                  <select
                    className={s.select}
                    value={subCategoriaSelected.estado}
                    onChange={(e) =>
                      setSubCategoriaSelected({
                        ...subCategoriaSelected,
                        categoriaID: Number(e.target.value),
                      })
                    }
                  >
                    <option value="0">Activo</option>
                    <option value="1">Inactivo</option>
                  </select>
                </div>
              </div>
            </fieldset>

            <div className={s.buttonGroup}>
              <button
                className={`${s.btn} ${s.btnPrimary}`}
                onClick={HandledCreate}
                disabled={formState !== "lectura"}
              >
                <BtonCrear />
              </button>

              <button className={`${s.btn} ${s.btnEdit}`}
                onClick={HandledEdit}
                disabled={formState !=="lectura"}>
                <BtnEdit />
              </button>
              <button className={`${s.btn} ${s.btnSuccess}`}
                disabled={formState !=="edicion"}>
                <BtnSave />
              </button>
              <button className={`${s.btn} ${s.btnDanger}`}
                disabled={formState !=="lectura"}
                onClick={HandledEliminar}>
                <BtnEliminar />
              </button>
            </div>
          </div>

          <div className={s.list}>
            <div className={s.listHeader}>
              <h3>Listado Subcategorías </h3>
              <input
                className={s.search}
                placeholder="Ingrese Nombre Subcategorías ... "
              ></input>
            </div>

            <table
              className={`${s.table} ${formState !== "lectura" ? s.disabledTable : ""}`}
            >
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                </tr>
              </thead>

              <tbody>
                {listadoSubcategorias.map((d, i) => (
                  <tr
                    key={i}
                    onClick={() => setSubCategoriaSelected(d)}
                    className={
                      subCategoriaSelected?.subCategoriaCodigo ===
                      d.subCategoriaCodigo
                        ? s.selectedRow
                        : ""
                    }
                  >
                    <td>{d.subCategoriaCodigo}</td>
                    <td>{d.subCategoriaNombre}</td>
                    <td>{d.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
