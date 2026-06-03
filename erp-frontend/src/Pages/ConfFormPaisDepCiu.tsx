import { useState } from "react";
import s from "../Pages/shared.module.css";
import { Select } from "../Components/UI/Select";
import ConfPaises from "./ConfFormPaises";
import ConfDepartamentos from "./ConfFormDepartamentos";
import ConfCiudades from "../Pages/ConfFormCiudades";

export default function ConfGeografia() {
  const [option, setOptions] = useState("Pais");
  return (
    <div className={s.container}>
      <Select
        label="Opciones"
        name="Option"
        options={[
          { value: "Pais", label: "Paises" },
          { value: "Departamentos", label: "Departamentos" },
          { value: "Ciudades", label: "Ciudades" },
        ]}
        onChange={(e) => setOptions(e.target.value)}
      ></Select>
      <div>{option === "Pais" && <ConfPaises />}</div>
      <div>{option === "Departamentos" && <ConfDepartamentos />}</div>
      <div>{option === "Ciudades" && <ConfCiudades />}</div>
    </div>
  );
}
