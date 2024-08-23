import { UserRole } from '#domain/enum/user_role'
import User from '#models/user'
import { inject } from '@adonisjs/core'
import RecruiterRepository from '#domain/contracts/repositories/recruiter_repository'

@inject()
export default class VerifyUserIsRecruiterUseCase {
  constructor(private readonly recruiterRespository: RecruiterRepository) {}

  async execute(user: User) {
    const recruiter = await this.recruiterRespository.findByUserId(user.id)
    return Number(user.role) === Number(UserRole.recruiter) || recruiter !== null
  }
}
