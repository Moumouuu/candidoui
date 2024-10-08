import { inject } from '@adonisjs/core'
import { RecruiterCreateDTO } from '#domain/contracts/dto/recruiter_dto'
import RecruiterRepository from '#domain/contracts/repositories/recruiter_repository'

@inject()
export default class RecruiterCreateUsecase {
  constructor(private readonly recruiterRepository: RecruiterRepository) {}

  async execute({ company_name, location, sector_of_activity, user }: RecruiterCreateDTO) {
    return this.recruiterRepository.create({ company_name, location, sector_of_activity, user })
  }
}
