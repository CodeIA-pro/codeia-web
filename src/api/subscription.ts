import axios from "axios";
import { API_URL } from "../services";
import { getAuthorizationHeaders } from "../utils/authorization";
import { Code, Subscribe, Subscription } from "../interfaces/subscription/subscription.interface";


export const mySubscription = async (): Promise<Subscription> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.get(API_URL + 'subscription/get_user/', { headers });
  return response.data;
};

export const subscribe = async (data: Code): Promise<Subscribe> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.post(API_URL + 'subscription/subscribe/', data ,{ headers });
  return response.data;
};

export const cancelSubscribe = async (): Promise<Subscribe> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.post(API_URL + 'subscription/cancel-subscription/', {} ,{ headers });
  return response.data;
};