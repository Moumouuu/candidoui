import { MultipartFile } from '@adonisjs/core/bodyparser'
import UploadFileRepository from '#domain/contracts/repositories/upload_file_repository'
import { inject } from '@adonisjs/core'

@inject()
export default class UploadFileUsecase {
  constructor(private uploadFileRepository: UploadFileRepository) {}

  async execute(file: MultipartFile): Promise<string> {
    return this.uploadFileRepository.upload(file)
  }

  delete(filePath: string): void {
    return this.uploadFileRepository.delete(filePath)
  }
}
