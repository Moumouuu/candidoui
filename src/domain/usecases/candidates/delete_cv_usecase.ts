import User from '#models/user'
import UploadFileUsecase from '#domain/usecases/files/upload_file_usecase'
import { inject } from '@adonisjs/core'
import UserRepository from '#domain/contracts/repositories/user_repository'
import CandidateRepository from '#domain/contracts/repositories/candidate_repository'

@inject()
export default class DeleteCvUsecase {
  constructor(
    private readonly uploadFileUsecase: UploadFileUsecase,
    private readonly userRepository: UserRepository,
    private readonly candidateRepository: CandidateRepository
  ) {}

  async execute(user: User) {
    const candidate = await this.candidateRepository.findCandidateByUserId(user.id)

    // allow to delete the file
    this.uploadFileUsecase.delete(candidate.cv)
    candidate.cv = ''

    await this.candidateRepository.save(candidate)
  }
}
