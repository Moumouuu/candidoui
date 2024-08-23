import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import VerifyUserIsRecruiterUseCase from '#domain/usecases/recruiter/verify_user_is_recruiter_usecase'
import ShowUserHomePresenterUsecase from '#domain/usecases/users/show_user_home_presenter'

@inject()
export default class OfferController {
  constructor(
    private readonly verifyUserIsRecruiterUseCase: VerifyUserIsRecruiterUseCase,
    private readonly showUserHomePresenterUsecase: ShowUserHomePresenterUsecase
  ) {}

  async show({ inertia, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const isRecruiter = await this.verifyUserIsRecruiterUseCase.execute(user)

    // if user is not a recruiter, redirect to the page to create a recruiter
    if (!isRecruiter) {
      return response.redirect().toRoute('recruiter')
    }

    return inertia.render('offers/create', {
      user: this.showUserHomePresenterUsecase.execute(user),
    })
  }

  async create({}: HttpContext) {
    // todo: implement
  }

  async update({}: HttpContext) {
    // todo: implement
  }

  async destroy({}: HttpContext) {
    // todo: implement
  }
}
