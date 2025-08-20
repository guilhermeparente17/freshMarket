import { AxiosError } from "axios";
import api from "./api";
import type { LoginPayload, RegisterPayload } from "./types";

export const useRegister = async (payload: RegisterPayload) => {
  if (!payload) {
    return;
  }
  try {
    const response = await api.post(`/register`, payload);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message);
    }
  }
};

export const useLogin = async (payload: LoginPayload) => {
  if (!payload) {
    return;
  }
  try {
    const response = await api.post(`/login`, payload);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message);
    }
  }
};

export const useLoginAdmin = async (payload: LoginPayload) => {
  if (!payload) {
    return;
  }
  try {
    const response = await api.post(`/login-admin`, payload);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message);
    }
  }
};
