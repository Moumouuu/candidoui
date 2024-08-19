import { UserRegisterDTO } from '#domain/contracts/dto/user_dto'
import User from '#models/user'

export default abstract class UserRepository {
  abstract create(payload: UserRegisterDTO): Promise<User>
  abstract save(user: User): Promise<User>
  abstract load(relation: string, user: User): Promise<void>
}
