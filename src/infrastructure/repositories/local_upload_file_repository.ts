import UploadFileRepository from '#domain/contracts/repositories/upload_file_repository'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'

export default class LocalUploadFileRepository implements UploadFileRepository {
  private UPLOAD_PATH = 'uploads'
  async upload(file: any): Promise<string> {
    await file.move(app.makePath(this.UPLOAD_PATH), {
      name: `${cuid()}.${file.extname}`,
    })

    return this.UPLOAD_PATH + '/' + file.fileName
  }
}
