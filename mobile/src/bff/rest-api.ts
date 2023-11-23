import { getTokens, useSession } from '@/auth/context';
import { getToken } from '@/auth/useStorageState';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';


export class RestApi {
  protected baseURL?: string;
  private instance = axios.create({
    baseURL: this.baseURL,
  });

  private async api(): Promise<AxiosInstance> {
    this.instance.defaults.baseURL = this.baseURL
    const token = await getToken('access_token')
    if (token) {
      this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    return this.instance
  }
  
  protected async get<T>(url: string, config?: AxiosRequestConfig, api = this.api()): Promise<T>{
    const response = await (await api).get<T>(url, config);
    return response.data;
  }

  protected async post<T, D>(url: string, data?: D, config?: AxiosRequestConfig, api = this.api()): Promise<T> {
    const response = await (await api).post<T>(url, data, config);
    return response.data;
  }

  protected async put<T, D>(url: string, data?: D, config?: AxiosRequestConfig, api = this.api()): Promise<T> {
    const response = await (await api).put<T>(url, data, config);
    return response.data;
  }
  
  protected async patch<T, D>(url: string, data?: D, config?: AxiosRequestConfig, api = this.api()): Promise<T> {
    const response = await (await api).patch<T>(url, data, config);
    return response.data;
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig, api = this.api()): Promise<T> {
    const response = await (await api).delete<T>(url, config);
    return response.data;
  }
}