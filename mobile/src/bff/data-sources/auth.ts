import { BaseApi } from '../base-api';
import { AttemptRequest, AttemptResponse, AuthSignInRequest, AuthSignUpRequest, AuthTokenResponse } from '../schemas/auth';
export class Auth extends BaseApi {
  override baseURL = 'https://splitbill-one.vercel.app/v1/auth'

  signIn(params: AuthSignInRequest) {
    return this.post<AuthTokenResponse,AuthSignInRequest>(`/signin`, params)
  }

  signUp(params: AuthSignUpRequest) {
    return this.post<AuthTokenResponse,AuthSignUpRequest>(`/signup`, params)
  }

  attempt(params: AttemptRequest) {
    return this.get<AttemptResponse>(`/attempt`, { params })
  }
}