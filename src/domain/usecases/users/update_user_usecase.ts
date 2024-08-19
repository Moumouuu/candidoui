import UserRepository from '#domain/contracts/repositories/user_repository'
import User from '#models/user'
import { UserProfileUpdateDTO } from '#domain/contracts/dto/user_dto'
import CandidateRepository from '#domain/contracts/repositories/candidate_repository'
import { inject } from '@adonisjs/core'

@inject()
export default class UpdateUserProfileUsecase {
  constructor(
    private userRepository: UserRepository,
    private candidateRepository: CandidateRepository
  ) {}

  async execute(user: User, data: UserProfileUpdateDTO): Promise<User> {
    user.email = data.email ?? user.email
    user.first_name = data.first_name ?? user.first_name
    user.last_name = data.last_name ?? user.last_name

    // load relationship to access location and portfolio_link
    await this.userRepository.load('candidate', user)

    const candidate = user.candidate
    if (candidate) {
      candidate.location = data.location ?? candidate.location
      candidate.portfolio_link = data.portfolio_link ?? candidate.portfolio_link
      await this.candidateRepository.save(candidate)
    }

    return this.userRepository.save(user)
  }
}
