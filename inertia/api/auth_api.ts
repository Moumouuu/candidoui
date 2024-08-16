import { UerLoginDTO, UerRegisterDTO } from '~/models/dto/user_dto'
import axios from 'axios'

export class AuthApi {
  static login(payload: UerLoginDTO): Promise<Response> {
    return axios.post('/login', payload)
  }
  static register(payload: UerRegisterDTO): Promise<Response> {
    return axios.post('/register', payload)
  }

  static logout(): Promise<Response> {
    return axios.delete('/logout')
  }
}
