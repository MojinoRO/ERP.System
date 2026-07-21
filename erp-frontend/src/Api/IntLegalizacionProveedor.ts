import api from "../Api/AxiosConfig";

export const CreatelegalizacionTransportadores = async (
  data: unknown,
): Promise<boolean> => {
  try {
    const create = await api.post(
      `/IntLegalizacionTransportadores/created`,
      data,
    );
    return create.status === 200 || create.status < 300;
  } catch (error: any) {
    console.log(error.response?.message);
    return false;
  }
};
