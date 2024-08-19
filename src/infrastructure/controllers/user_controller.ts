import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UserRepository from '#domain/contracts/repositories/user_repository'
import UploadCvUsecase from '#domain/usecases/candidates/upload_cv_usecase'
import UpdateUserProfileUsecase from '#domain/usecases/users/update_user_usecase'
import ShowUserProfilePresenterUsecase from '#domain/usecases/users/show_user_presenter_usecase'
import DeleteUserUsecase from '#domain/usecases/users/delete_user_usecase'

@inject()
export default class UserController {
  constructor(
    private updateProfileUsecase: UpdateUserProfileUsecase,
    private showProfilePresenterUsecase: ShowUserProfilePresenterUsecase,
    private uploadCvUsecase: UploadCvUsecase,
    private userRepository: UserRepository,
    private deleteUserUsecase: DeleteUserUsecase
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

  async deleteProfile({ response, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    try {
      await this.deleteUserUsecase.execute(user)
      return response.ok({
        message: 'Your account has been deleted successfully',
      })
    } catch (error) {
      return response.status(400).send(error.message)
    }
  }
}
