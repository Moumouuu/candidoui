import { UserLoginDTO, UserRegisterDTO } from '#domain/contracts/dto/user_dto'
import axios from 'axios'

export class AuthApi {
  static login(payload: UserLoginDTO): Promise<Response> {
    return axios.post('/login', payload)
  }
  static register(payload: UserRegisterDTO): Promise<Response> {
    return axios.post('/register', payload)
  }

  static logout(): Promise<Response> {
    return axios.delete('/logout')
  }
}
