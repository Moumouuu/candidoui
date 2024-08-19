import axios from 'axios'
import { UserProfileUpdateDTO } from '#domain/contracts/dto/user_dto'

export default class UserApi {
  static async updateProfile(data: UserProfileUpdateDTO) {
    return axios.patch('/profile', data)
  }
  static async updateCV(cv: FormData) {
    return axios.patch('/profile/cv', cv, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  static async delete() {
    return axios.delete(`/profile`)
  }
}
