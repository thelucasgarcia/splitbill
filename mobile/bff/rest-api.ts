import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { DataSourceProps } from './data-sources';


export class RestApi {
  protected baseURL?: string;
  
  private api(): AxiosInstance {
    return axios.create({
      baseURL: this.baseURL,
    });
  }
  
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api().get<T>(url, config);
    return response.data;
  }

  async post<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api().post<T>(url, data, config);
    return response.data;
  }

  async put<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api().put<T>(url, data, config);
    return response.data;
  }
  
  async patch<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api().patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api().delete<T>(url, config);
    return response.data;
  }
}