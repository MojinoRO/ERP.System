import { useState } from "react";

export function useForm<T>(initialValue: T) {
  const [form, setForm] = useState<T>(initialValue);

  function setField<K extends keyof T>(field: K, value: T[K]) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function reset() {
    setForm(initialValue);
  }

  function load(data: T) {
    setForm(data);
  }

  return {
    form,
    setForm,
    setField,
    reset,
    load,
  };
}
