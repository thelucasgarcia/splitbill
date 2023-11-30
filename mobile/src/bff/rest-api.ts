import { getToken, setStorageItemAsync } from '@/auth/useStorageState';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

export class RestApi {
  protected baseURL?: string;
  private instance = axios.create({
    baseURL: this.baseURL,
  });

  private api(): AxiosInstance {
    this.instance.defaults.baseURL = this.baseURL
    this.instance.interceptors.request.use(async (request) => {
      const accessToken = await getToken('access_token')
      if (accessToken && !request.headers.Authorization) {
        request.headers.Authorization = `Bearer ${accessToken}`
      }
      return Promise.resolve(request)
    })

    this.instance.interceptors.response.use(async (response) => {
      return response
    }, async (error: AxiosError) => {
    
      if (error.response?.status === 401) {
          const response = await this.refreshToken(error)
          return response
      }

      return Promise.reject(error);
    })

    return this.instance
  }

  private refreshToken(error: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const refreshToken = await getToken('refresh_token')
        this.instance.post('https://splitbill-one.vercel.app/v1/auth/refresh', null, {
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        }).then(async (res) => {
          setStorageItemAsync('access_token', res.data.access_token)
          setStorageItemAsync('refresh_token', res.data.refresh_token)
          // Fazer algo caso seja feito o refresh token
          return resolve(res);
        })
          .catch((err) => {
            // Fazer algo caso não seja feito o refresh token
            return reject(error);
          });
      } catch (err) {
        return reject(err);
      }
    })
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig, api = this.api()): Promise<T> {
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