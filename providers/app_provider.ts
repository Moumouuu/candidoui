import type { ApplicationService } from '@adonisjs/core/types'
import UserRepository from '#domain/contracts/repositories/user_repository'
import LucidUserRepository from '#infrastructure/repositories/lucid_user_repository'
import CandidateRepository from '#domain/contracts/repositories/candidate_repository'
import LucidCandidateRepository from '#infrastructure/repositories/lucid_candidate_repository'
import LocalUploadFileRepository from '#infrastructure/repositories/local_upload_file_repository'
import UploadFileRepository from '#domain/contracts/repositories/upload_file_repository'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {}

  /**
   * The container bindings have booted
   */
  async boot() {
    this.app.container.bind(UserRepository, () => new LucidUserRepository())
    this.app.container.bind(CandidateRepository, () => new LucidCandidateRepository())
    this.app.container.bind(UploadFileRepository, () => new LocalUploadFileRepository())
  }

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}
