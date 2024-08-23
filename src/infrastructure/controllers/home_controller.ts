import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class HomeController {
  async index({ inertia, auth }: HttpContext) {
    let user = null
    try {
      await auth.authenticate()
      user = auth.getUserOrFail()
    } catch (error) {
      return inertia.render('home')
    }

    return inertia.render('home', {
      user: this.showUserHomePresenter(user),
    })
  }

  showUserHomePresenter(user: User) {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    }
  }
}
