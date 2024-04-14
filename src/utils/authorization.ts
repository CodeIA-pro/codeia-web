import { AxiosHeaders } from "axios";
import { useAuthStore } from "../store";

export const getAuthorizationHeaders = (): AxiosHeaders => {
  const { user } = useAuthStore.getState();
  const headers = new AxiosHeaders();

  if (user && user.access) {
    headers.set("Authorization", `Bearer ${user.access}`);
  }

  return headers;
};