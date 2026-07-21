import { useState } from "react";
import f from "./DateInput.module.css";
import { isValidDate } from "../../Helper/DateValidator";

interface Props {
  value: string;
  onValueChange: (value: string) => void;
  required?: boolean;
  min?: string;
  max?: string;
  disabled?: boolean;
}

export function DateInput({
  value,
  onValueChange,
  required = false,
  min,
  max,
  disabled,
}: Props) {
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onValueChange(value);
    if (required && value === "") {
      setError("La fecha es obligatoria.");
      return;
    }
    if (value && !isValidDate(value)) {
      setError("La fecha no existe.");
      return;
    }
    setError("");
  };
  return (
    <div className={f.container}>
      <input
        className={`${f.input} ${error ? f.errorInput : ""}`}
        type="date"
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onChange={handleChange}
      />

      {error && <span className={f.error}>{error}</span>}
    </div>
  );
}
