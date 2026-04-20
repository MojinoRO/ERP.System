import { useEffect, useState } from "react";
import s from "./shared.module.css";
import type { CargaDatosEmpresaResponse } from "../Types/ConfEmpresa";
import { GetDatosEmpresa, saveDatosEmpresa } from "../Api/ConfEmpresaService";

export default function FormEmpresa() {
  const [btnActivo, setBtnAcivo] = useState(false);
  const [datosEmpresa, setdatosEmpresa] = useState<CargaDatosEmpresaResponse>({
    EmpresaID: 0,
    EmpresaNit: "",
    EmpresaDv: "",
    EmpresaNombre: "",
    EmpresaRazonSocial: "",
    EmpresaRepresentanteLegal: "",
    EmpresaTelefono: "",
    EmpresaDireccion: "",
    EmpresaEmail: "",
    EmpresaKeyLicencia: "",
  });
  const cargarDatosEmpresa = async () => {
    try {
      const data = await GetDatosEmpresa();
      setdatosEmpresa(data);
    } catch (error) {
      console.error(error);
      alert("Empresa Sin Datos");
    }
  };

  useEffect(() => {
    cargarDatosEmpresa();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setdatosEmpresa({
      ...datosEmpresa,
      [name]: value.toUpperCase(),
    });
  };

  const SaveChanged = async() =>{
    try{
      await saveDatosEmpresa(datosEmpresa);
      alert("Datos cargados correctamente");
      setBtnAcivo(false);
    }catch(error){
      console.log(error);
      alert("Error al guardar")
    }
  }

  return (
    <div className={s.FormCenter}>
      <div className={s.card} style={{ width: "100%", maxWidth: "900px" }}>
        {/* HEADER */}
        <div className={s.cardHeader}>
          <h1 className={s.pageTitle}>Datos Empresa</h1>
          <div className={s.btnGroup}>
            <button
              className={`${s.btn} ${s.btnEdit}`}
              onClick={() => setBtnAcivo(true)}
            >
              Editar
            </button>
            <button className={`${s.btn} ${s.btnSuccess}`} onClick={() => SaveChanged()} disabled={!btnActivo}>
              Guardar
            </button>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className={s.formRow}>
          <div className={s.formGroup}>
            <label className={s.label}>NIT Empresa</label>
            <input
              className={s.input}
              placeholder="Ingrese NIT"
              disabled={!btnActivo}
              value={datosEmpresa.EmpresaNit}
              onChange={handleChange}
              name="EmpresaNit"
            />
          </div>

          <div className={s.formGroup}>
            <label className={s.label}>Dígito Verificación</label>
            <input
              className={s.input}
              placeholder="DV"
              disabled={!btnActivo}
              value={datosEmpresa.EmpresaDv}
              onChange={handleChange}
              name="EmpresaDv"
            />
          </div>
        </div>

        <div className={s.formRow}>
          <div className={s.formGroup}>
            <label className={s.label}>Nombre Empresa</label>
            <input
              name="EmpresaNombre"
              className={s.input}
              placeholder="Nombre comercial"
              disabled={!btnActivo}
              value={datosEmpresa.EmpresaNombre}
              onChange={handleChange}
            />
          </div>

          <div className={s.formGroup}>
            <label className={s.label}>Establecimiento</label>
            <input
              className={s.input}
              placeholder="Sucursal o establecimiento"
              disabled={!btnActivo}
              value={datosEmpresa.EmpresaRazonSocial}
              onChange={handleChange}
              name="EmpresaRazonSocial"
            />
          </div>
        </div>

        <div className={s.formRow}>
          <div className={s.formGroup}>
            <label className={s.label}>Representante Legal</label>
            <input
              className={s.input}
              placeholder="Representante Legal"
              disabled={!btnActivo}
              value={datosEmpresa.EmpresaRepresentanteLegal}
              onChange={handleChange}
              name="EmpresaRepresentanteLegal"
            />
          </div>

          <div className={s.formGroup}>
            <label className={s.label}>Teléfono</label>
            <input
              className={s.input}
              placeholder="Teléfono"
              disabled={!btnActivo}
              value={datosEmpresa.EmpresaTelefono}
              onChange={handleChange}
              name="EmpresaTelefono"
            />
          </div>
        </div>

        <div className={s.formRow}>
          <div className={s.formGroup}>
            <label className={s.label}>Dirección</label>
            <input
              className={s.input}
              placeholder="Dirección"
              disabled={!btnActivo}
              value={datosEmpresa.EmpresaDireccion}
              onChange={handleChange}
              name="EmpresaDireccion"
            />
          </div>

          <div className={s.formGroup}>
            <label className={s.label}>Email</label>
            <input
              className={s.input}
              placeholder="Correo electrónico"
              disabled={!btnActivo}
              value={datosEmpresa.EmpresaEmail}
              onChange={handleChange}
              name="EmpresaEmail"
            />
          </div>
        </div>

        <div className={s.formRow}>
          <div className={s.formGroup}>
            <label className={s.label}>Licencia Key</label>
            <input
              className={s.input}
              placeholder="Clave de licencia"
              type="password"
              disabled={!btnActivo}
              value={datosEmpresa.EmpresaKeyLicencia}
              onChange={handleChange}
              name="EmpresaKeyLicencia"
            />
          </div>
        </div>

        {/* BOTÓN ADICIONAL */}
        <div className={s.btnGroup} style={{ marginTop: "16px" }}>
          <button className={s.btnPrimary} disabled={!btnActivo}>
            Acciones
          </button>
        </div>
      </div>
    </div>
  );
}
