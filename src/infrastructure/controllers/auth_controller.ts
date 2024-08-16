import { inject } from '@adonisjs/core'

import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import { CreateUserUsecase } from '#domain/usecases/users/create_user_usecase'

@inject()
export default class AuthController {
  constructor(private createUserUsecase: CreateUserUsecase) {}

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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { email, password, first_name, last_name } = request.only([
      'email',
      'password',
      'first_name',
      'last_name',
    ])

    const user = await this.createUserUsecase.execute({ email, password, first_name, last_name })

    await auth.use('web').login(user as User)

    return response.created()
  }

  async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()

    response.redirect('/')
  }
}
