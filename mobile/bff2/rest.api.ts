import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';


export class RestApi {
  protected baseURL?: string;
  
  private api(): AxiosInstance {
    return axios.create({
      baseURL: this.baseURL,
    });
  }
  
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api().get<T>(url, config);
    return response.data;
  }

  protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api().post<T>(url, data, config);
    return response.data;
  }

  protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api().put<T>(url, data, config);
    return response.data;
  }
  
  protected async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api().patch<T>(url, data, config);
    return response.data;
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api().delete<T>(url, config);
    return response.data;
  }
}