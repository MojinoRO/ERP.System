import { useRef, useCallback, useState } from "react";

type EstadoValidacion =
  | "idle"
  | "validando"
  | "existe"
  | "disponible"
  | "error";

interface UseValidateCodigoReturn {
  estado: EstadoValidacion;
  codigoExiste: boolean | null;
  validando: boolean;
  validar: (codigo: string) => Promise<void>;
  setCodigoOriginal: (codigo: string) => void;
  reset: () => void;
}

export function useValidateCodigo(
  fnvValidar: (codigo: string) => Promise<boolean>,
): UseValidateCodigoReturn {
  const [estado, setEstado] = useState<EstadoValidacion>("idle");
  const codigoOriginal = useRef<string>("");
  const ultimaPeticion = useRef(0);

  const validar = useCallback(
    async (codigoCrudo: string) => {
      const codigo = codigoCrudo.trim();

      if (!codigo) {
        setEstado("idle");
        return;
      }
      // Si no cambió respecto al valor original (modo edición), no se valida
      if (codigo === codigoOriginal.current) {
        setEstado("idle");
        return;
      }

      setEstado("validando");

      const idPeticion = ++ultimaPeticion.current;

      try {
        const existe = await fnvValidar(codigo);

        //Ignorar respuestas obsoletas (race condition)
        if (idPeticion !== ultimaPeticion.current) return;

        setEstado(existe ? "existe" : "disponible");
      } catch (error) {
        if (idPeticion !== ultimaPeticion.current) return;
        setEstado("error");
      }
    },
    [fnvValidar],
  );

  const setCodigoOriginal = useCallback((codigo: string) => {
    codigoOriginal.current = codigo;
  }, []);

  const reset = useCallback(() => {
    setEstado("idle");
    codigoOriginal.current = "";
    ultimaPeticion.current = 0;
  }, []);

  return {
    estado,
    codigoExiste:
      estado === "existe" ? true : estado === "disponible" ? false : null,
    validando: estado === "validando",
    validar,
    setCodigoOriginal,
    reset,
  };
}
