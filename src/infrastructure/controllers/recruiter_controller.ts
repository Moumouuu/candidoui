import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ShowUserHomePresenterUsecase from '#domain/usecases/users/show_user_home_presenter'

@inject()
export default class RecruiterController {
  constructor(private readonly showUserHomePresenterUsecase: ShowUserHomePresenterUsecase) {}

  async show({ inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    return inertia.render('recruiter/create', {
      user: this.showUserHomePresenterUsecase.execute(user),
    })
  }

  async create({}: HttpContext) {
    // todo: implement
  }
}
