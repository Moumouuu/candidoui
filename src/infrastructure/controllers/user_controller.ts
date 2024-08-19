import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UpdateProfileUsecase from '#domain/usecases/users/update_profile_usecase'
import UserRepository from '#domain/contracts/repositories/user_repository'
import ShowProfilePresenterUsecase from '#domain/usecases/users/show_profile_presenter_usecase'
import UploadCvUsecase from '#domain/usecases/candidates/upload_cv_usecase'

@inject()
export default class UserController {
  constructor(
    private updateProfileUsecase: UpdateProfileUsecase,
    private showProfilePresenterUsecase: ShowProfilePresenterUsecase,
    private uploadCvUsecase: UploadCvUsecase,
    private userRepository: UserRepository
  ) {}

  async showProfile({ inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    // use to load relationship directly in the user variable define above
    await this.userRepository.load('candidate', user)

    return inertia.render('user/profile', {
      user: this.showProfilePresenterUsecase.execute(user),
    })
  }

  async updateProfile({ request, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = request.only(['first_name', 'last_name', 'email', 'location', 'portfolio_link'])

    try {
      await this.updateProfileUsecase.execute(user, data)
      return response.ok(user)
    } catch (error) {
      return response.status(400).send(error.message)
    }
  }

  async updateProfileCV({ request, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const cvFile = request.file('cv', {
      size: '3mb',
      extnames: ['pdf'],
    })

    if (!cvFile?.isValid) return response.badRequest('Invalid file')

    try {
      const fileUrl = await this.uploadCvUsecase.execute(user.id, cvFile)
      return response.ok({
        fileUrl,
      })
    } catch (error) {
      return response.status(400).send(error.message)
    }
  }
}
