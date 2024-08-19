import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Candidate from '#models/candidate'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import { inject } from '@adonisjs/core'
import UpdateProfileUsecase from '#domain/usecases/users/update_profile_usecase'

@inject()
export default class UserController {
  constructor(private updateProfileUsecase: UpdateProfileUsecase) {}

  async showProfile({ inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    // use to load relationship directly in the user variable define above
    await user.load('candidate')

    return inertia.render('user/profile', {
      user: this.showProfilePresenterToJSON(user),
    })
  }

  // todo : move to usecase
  showProfilePresenterToJSON(user: User) {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      cv: 'uploads/' + user.candidate.cv, // todo : remove uploads/ from cv url
      portfolio_link: user.candidate.portfolio_link,
      location: user.candidate.location,
    }
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

    // todo : move to usecase
    const candidate = await Candidate.query().where('user_id', user.id).first()
    if (!candidate) return response.status(404).send('Candidate not found')

    /**
     * Moving avatar to the "uploads" directory
     */
    await cvFile.move(app.makePath('uploads'), {
      name: `${cuid()}.${cvFile.extname}`,
    })

    /**
     * Dummy code to save the filename as avatar
     * on the user model and persist it to the
     * database.
     */
    candidate.cv = cvFile.fileName ?? null

    await candidate.save()
    return response.ok({
      cvUrl: '/uploads/' + cvFile.fileName,
    })
  }
}
