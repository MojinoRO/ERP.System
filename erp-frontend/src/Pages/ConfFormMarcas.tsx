import { useState, useEffect } from "react";
import {
  BtonCrear,
  BtnEdit,
  BtnCancel,
  BtnEliminar,
  BtnSave,
} from "../Components/component";
import s from "./shared.module.css";
import type { responseMarcas } from "../Types/ConfMarcas";
import {
  BuscadorMarcas,
  ListarMarcas,
  ValideCodigoBD,
  CreateMarcas,
  UpdateMarcas,
  DeleteMarcas,
} from "../Api/ConfMarcas";
import { Input } from "../Components/UI/Input";
import { Select } from "../Components/UI/Select";
import { Button } from "../Components/UI/Button";
import { ErrorAlert } from "../Components/UI/ErrorAlert";
import { ConfirmDialog } from "../Components/UI/ConfirmDialog";

export default function ConfFormMarcas() {
  const emptyMarca: responseMarcas = {
    marcaID: 0,
    codigoMarca: "",
    marcaNombre: "",
    estado: 0,
  };

  const [formState, setFormState] = useState<"lectura" | "edicion">("lectura");
  const [listadoMarcas, setListadomarcas] = useState<responseMarcas[]>([]);
  const [marcaselected, setMarcaSelected] = useState(emptyMarca);
  const [nombremarca, setNombreMarcas] = useState("");

  // Estados para validación y alertas
  const [errors, setErrors] = useState<{
    codigoMarca?: string;
    marcaNombre?: string;
  }>({});
  const [alert, setAlert] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const getMarcas = async () => {
    try {
      const listado = await ListarMarcas();
      setListadomarcas(listado);
    } catch (error: any) {
      setAlert({
        message: "Error al cargar Marcas",
        type: "error",
      });
    }
  };

  const handleBuscar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const dato = e.target.value;
    setNombreMarcas(dato);
    if (!dato.trim()) return await getMarcas();
    try {
      const response = await BuscadorMarcas(dato);
      setListadomarcas(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMarcas();
  }, []);

  const HandledCreate = () => {
    setMarcaSelected(emptyMarca);
    setFormState("edicion");
    setErrors({});
  };

  const handleCancel = () => {
    setMarcaSelected(emptyMarca);
    setFormState("lectura");
    setErrors({});
  };

  const handleEdit = () => {
    if (marcaselected.marcaID === 0) {
      setAlert({
        message: "Seleccione Marca para editar",
        type: "error",
      });
      return;
    }
    setFormState("edicion");
    setErrors({});
  };

  const validate = (e: responseMarcas) => {
    const newErrors: typeof errors = {};

    if (!e.codigoMarca.trim()) {
      newErrors.codigoMarca = "Código requerido";
    }
    if (!e.marcaNombre.trim()) {
      newErrors.marcaNombre = "Nombre requerido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate(marcaselected)) return;
    try {
      const isNew = marcaselected.marcaID === 0;
      if (isNew) {
        const codigoOk = await ValideCodigoBD(marcaselected.codigoMarca);
        if (codigoOk) {
          setAlert({
            message: "Código ya existe",
            type: "error",
          });
          return;
        }
      }

      const Ok = isNew
        ? await CreateMarcas(marcaselected)
        : await UpdateMarcas(marcaselected);

      const action = isNew ? "creada" : "actualizada";

      setAlert({
        message: `Marca ${action} correctamente`,
        type: Ok ? "success" : "error",
      });

      getMarcas();
      setFormState("lectura");
      setMarcaSelected(emptyMarca);
      setErrors({});
    } catch (error: any) {
      setAlert({
        message: "Error al guardar marca",
        type: "error",
      });
      console.log(error.response?.data);
    }
  };

  const HandledEliminar = async () => {
    if (marcaselected.marcaID === 0) {
      setAlert({
        message: "Seleccione marca a eliminar",
        type: "error",
      });
      return;
    }
    setConfirmDelete(true);
  };

  const confirmDeleteMarca = async () => {
    try {
      const eliminar = await DeleteMarcas(marcaselected.marcaID);
      setAlert({
        message: eliminar
          ? "Marca Eliminada correctamente"
          : "Error al eliminar Marca",
        type: eliminar ? "success" : "error",
      });
      getMarcas();
      setMarcaSelected(emptyMarca);
      setFormState("lectura");
      setConfirmDelete(false);
    } catch (error: any) {
      setAlert({
        message: "Error al eliminar marca",
        type: "error",
      });
      console.log(error.response?.data);
    }
  };

  const handledChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setMarcaSelected((prev) => ({
      ...prev,
      [name]: name === "estado" ? Number(value) : value.toUpperCase(),
    }));

    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  return (
    <div className={s.container}>
      <h2 className={s.pageTitle}>Configuración de Marcas</h2>

      {alert && (
        <ErrorAlert
          message={alert.message}
          type={alert.type}
          autoClose={3000}
          onClose={() => setAlert(null)}
        />
      )}

      <div className={s.grid}>
        <div className={s.formulario}>
          <fieldset disabled={formState !== "edicion"} className={s.fieldset}>
            <h3 className={s.sectionTitle}>Información General</h3>

            <div className={s.formRow}>
              <Input
                label="Código"
                name="codigoMarca"
                placeholder="Ingrese código"
                value={marcaselected.codigoMarca}
                onChange={handledChanged}
                error={errors.codigoMarca}
                required
                disabled={formState !== "edicion"}
              />

              <Input
                label="Nombre de Marca"
                name="marcaNombre"
                placeholder="Ingrese nombre"
                value={marcaselected.marcaNombre}
                onChange={handledChanged}
                error={errors.marcaNombre}
                required
                disabled={formState !== "edicion"}
              />

              <Select
                label="Estado"
                name="estado"
                value={marcaselected.estado}
                onChange={handledChanged}
                disabled={formState !== "edicion"}
                options={[
                  { value: 0, label: "Activo" },
                  { value: 1, label: "Inactivo" },
                ]}
              />
            </div>
          </fieldset>

          <div className={s.buttonGroup}>
            <Button
              variant="primary"
              size="md"
              disabled={formState !== "lectura"}
              onClick={HandledCreate}
            >
              <BtonCrear />
            </Button>

            <Button
              variant="secondary"
              size="md"
              disabled={formState !== "lectura"}
              onClick={handleEdit}
            >
              <BtnEdit />
            </Button>

            <Button
              size="md"
              disabled={formState !== "edicion"}
              onClick={handleSave}
            >
              <BtnSave />
            </Button>

            <Button
              variant="secondary"
              size="md"
              disabled={formState !== "edicion"}
              onClick={handleCancel}
            >
              <BtnCancel />
            </Button>

            <Button
              variant="danger"
              size="md"
              disabled={formState !== "lectura"}
              onClick={HandledEliminar}
            >
              <BtnEliminar />
            </Button>
          </div>
        </div>

        <div className={s.list}>
          <div className={s.listHeader}>
            <h3>Listado de Marcas</h3>
            <input
              className={s.search}
              placeholder="Buscar marca..."
              value={nombremarca}
              onChange={handleBuscar}
            />
          </div>
          <div className={s.tableWrapper}>
            <table
              className={`${s.table} ${formState === "edicion" ? s.disabledTable : ""}`}
            >
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {listadoMarcas.map((d, i) => (
                  <tr
                    key={i}
                    onDoubleClick={() => setMarcaSelected(d)}
                    className={
                      marcaselected?.marcaID === d.marcaID ? s.selectedRow : ""
                    }
                  >
                    <td>{d.codigoMarca}</td>
                    <td>{d.marcaNombre}</td>
                    <td>{d.estado === 0 ? "Activo" : "Inactivo"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        title="Eliminar Marca"
        message={`¿Estás seguro de que deseas eliminar la marca "${marcaselected.marcaNombre}"? Esta acción no se puede deshacer.`}
        type="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={confirmDeleteMarca}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}
