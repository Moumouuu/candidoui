import UserRepository from '#domain/contracts/repositories/user_repository'
import { UserRegisterDTO } from '#domain/contracts/dto/user_dto'
import User from '#models/user'

export default class PGUserRepository implements UserRepository {
  create(payload: UserRegisterDTO): Promise<User> {
    return User.create(payload) as Promise<User>
  }
}
