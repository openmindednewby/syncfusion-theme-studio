import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

const PETSTORE_BASE_URL = 'https://petstore3.swagger.io/api/v3';

const axiosInstance = axios.create({
  baseURL: PETSTORE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiInstance = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance(config);
  return response.data;
};

export default apiInstance;
