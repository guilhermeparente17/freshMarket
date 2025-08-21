import { AxiosError } from "axios";
import api from "./api";

export const getCategories = async (token: string) => {
  try {
    const response = await api.get(`/admin/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message);
    }
  }
};

export const postCategories = async (
  token: string,
  payload: { name: string; description: string }
) => {
  console.log(payload);
  try {
    const response = await api.post(`/admin/categories`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message);
    }
  }
};
