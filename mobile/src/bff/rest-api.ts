import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';


export class RestApi {
  protected baseURL?: string;
  private instance = axios.create({
    baseURL: this.baseURL,
  });

  private api(): AxiosInstance {
    this.instance.defaults.baseURL = this.baseURL
    return this.instance
  }
  
  protected async get<T>(url: string, config?: AxiosRequestConfig, api = this.api()): Promise<T>{
    const response = await api.get<T>(url, config);
    return response.data;
  }

  protected async post<T, D>(url: string, data?: D, config?: AxiosRequestConfig, api = this.api()): Promise<T> {
    const response = await api.post<T>(url, data, config);
    return response.data;
  }

  protected async put<T, D>(url: string, data?: D, config?: AxiosRequestConfig, api = this.api()): Promise<T> {
    const response = await api.put<T>(url, data, config);
    return response.data;
  }
  
  protected async patch<T, D>(url: string, data?: D, config?: AxiosRequestConfig, api = this.api()): Promise<T> {
    const response = await api.patch<T>(url, data, config);
    return response.data;
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig, api = this.api()): Promise<T> {
    const response = await api.delete<T>(url, config);
    return response.data;
  }
}