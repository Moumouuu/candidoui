import { UserRegisterDTO } from '#domain/contracts/dto/user_dto'
import { inject } from '@adonisjs/core'
import UserRepository from '#domain/contracts/repositories/user_repository'
import User from '#models/user'

@inject()
export class CreateUserUsecase {
  constructor(private userRepository: UserRepository) {}

  async execute(payload: UserRegisterDTO): Promise<User> {
    return this.userRepository.create(payload)
  }
}
