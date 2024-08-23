import { RecruiterCreateDTO } from '#domain/contracts/dto/recruiter_dto'
import axios from 'axios'

export default class RecruiterApi {
  static async create(payload: RecruiterCreateDTO) {
    return axios.post('/recruiter/create', payload)
  }
}
