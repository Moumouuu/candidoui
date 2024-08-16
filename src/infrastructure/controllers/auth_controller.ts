// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async showLogin({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async showRegister({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return response.ok('Logged in')
  }

  async register({ request, response, auth }: HttpContext) {
    const { email, password, fullName } = request.only(['email', 'password', 'fullName'])

    const user = await User.create({ email, password, fullName })

    await auth.use('web').login(user)

    return response.created()
  }

  async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()

    response.redirect('/')
  }
}
