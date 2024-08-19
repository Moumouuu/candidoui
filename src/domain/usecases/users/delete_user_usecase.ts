import UserRepository from '#domain/contracts/repositories/user_repository'
import User from '#models/user'
import { inject } from '@adonisjs/core'

@inject()
export default class DeleteUserUsecase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User) {
    await this.userRepository.delete(user)
  }
}
