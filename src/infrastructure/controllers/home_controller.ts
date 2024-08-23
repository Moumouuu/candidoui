import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ShowUserHomePresenterUsecase from '#domain/usecases/users/show_user_home_presenter'

@inject()
export default class HomeController {
  constructor(private showUserHomePresenterUsecase: ShowUserHomePresenterUsecase) {}

  async index({ inertia, auth }: HttpContext) {
    let user = null
    try {
      await auth.authenticate()
      user = auth.getUserOrFail()
    } catch (error) {
      return inertia.render('home')
    }

    return inertia.render('home', {
      user: this.showUserHomePresenterUsecase.execute(user),
    })
  }
}
