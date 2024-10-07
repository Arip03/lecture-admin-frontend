import axios from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'; 
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, token?: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
    });

    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (token) {
          config.headers = config.headers || {}; 
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error) 
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: any) => {
        const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
        return Promise.reject(new Error(errorMessage));
      }
    );    
  }

  async get<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
    return response.data;
  }

  async post<T>(url: string, data: any, config?: InternalAxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data: any, config?: InternalAxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
    return response.data;
  }

//   async uploadFile(
//     url: string,
//     file: File,
//     onUploadProgress: (event: ProgressEvent) => void,
//     additionalData: any = {}
//   ) {
//     const formData = new FormData();
//     formData.append('file', file);
//     for (const key in additionalData) {
//       formData.append(key, additionalData[key]);
//     }
//     const config: InternalAxiosRequestConfig = {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       onUploadProgress,
//     };
//     return this.axiosInstance.post(url, formData, config);
//   }
}

const baseURL = import.meta.env.VITE_APP_BASE_URL;
const apiClient = new ApiClient(baseURL, cookies.get('token'));

export default apiClient;
