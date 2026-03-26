import { type loginReponse, type loginRequest } from "../Types/LoginApp"

export const login = async (data: loginRequest): Promise<loginReponse> => {
  console.log("Enviando:", data);
  const response = await fetch("http://localhost:5278/api/ConfUsuarios/login", {
    method: "POST", // tipo de peticion
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // convierte el objeto en texto json
  });

  if (!response.ok) {
    throw new Error("Error al iniciar sesión");
  }

  return response.json(); // convierte la respuesta a objeto javascript
};