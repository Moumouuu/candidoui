import CandidateRepository from '#domain/contracts/repositories/candidate_repository'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { inject } from '@adonisjs/core'
import UploadFileUsecase from '#domain/usecases/files/upload_file_usecase'

@inject()
export default class UploadCvUsecase {
  constructor(
    private candidateRepository: CandidateRepository,
    private uploadFileUsecase: UploadFileUsecase
  ) {}

  async execute(userId: number, cvFile: MultipartFile): Promise<string> {
    const candidate = await this.candidateRepository.findCandidateByUserId(userId)

    const fileUrl = await this.uploadFileUsecase.execute(cvFile)

    candidate.cv = fileUrl

    await this.candidateRepository.save(candidate)

    return fileUrl
  }
}
