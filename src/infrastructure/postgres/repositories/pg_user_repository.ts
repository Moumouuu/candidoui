import UserRepository from '#domain/contracts/repositories/user_repository'
import { UserRegisterDTO } from '#domain/contracts/dto/user_dto'
import User from '#models/user'

export default class PGUserRepository implements UserRepository {
  async create(payload: UserRegisterDTO): Promise<User> {
    const user = await User.create(payload)

    // create default candidate relationship
    user.related('candidate').create({})

    return user
  }
}
