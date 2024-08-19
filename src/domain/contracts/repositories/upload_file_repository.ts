import { MultipartFile } from '@adonisjs/core/bodyparser'

export default abstract class UploadFileRepository {
  abstract upload(file: MultipartFile): Promise<string>
}
