import { BaseApi } from '../base-api';
import { AuthSignInRequest, AuthTokenResponse } from '../schemas/auth';
export class Auth extends BaseApi {
  override baseURL = 'https://splitbill-one.vercel.app/v1/auth'

  signIn(params: AuthSignInRequest) {
    return this.post<AuthTokenResponse,AuthSignInRequest>(`/signin`, params)
  }
  
}