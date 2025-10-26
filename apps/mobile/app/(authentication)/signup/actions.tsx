import api from "../../../lib/api";
import { Tos } from "../../types/tos.type";

export async function fetchSignupTos(): Promise<{
  success: boolean;
  data: Tos[];
}> {
  const response = await api.get<Tos[]>("/tos/signup");

  return {
    success: response.success,
    data: response.data,
  };
}
