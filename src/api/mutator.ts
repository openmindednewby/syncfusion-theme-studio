import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

const DUMMYJSON_BASE_URL = 'https://dummyjson.com';

const axiosInstance = axios.create({
  baseURL: DUMMYJSON_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiInstance = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance(config);
  return response.data;
};

export default apiInstance;
