import api from "@/lib/api";

export async function login(loginData: {
  email: string;
  password: string;
}): Promise<{
  success: boolean;
  data: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
  };
}> {
  const response = await api.post("/auth/login", loginData);

  return {
    success: response.success,
    data: response.data as {
      accessToken: string;
      tokenType: string;
      expiresIn: number;
    },
  };
}
