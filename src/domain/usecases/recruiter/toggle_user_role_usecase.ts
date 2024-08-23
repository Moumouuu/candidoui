import User from '#models/user'
import { UserRole } from '#domain/enum/user_role'
import { inject } from '@adonisjs/core'
import UserRepository from '#domain/contracts/repositories/user_repository'

@inject()
export default class ToggleUserRoleUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User, role: UserRole): Promise<User> {
    user.role = role

    await this.userRepository.save(user)
    return user
  }
}
