import { HttpContext } from '@adonisjs/core/http'
import { UserRole } from '#domain/enum/user_role'

export default class OfferController {
  async show({ inertia, auth, response }: HttpContext) {
    // if user is not a recruiter, redirect to the page to create a recruiter

    const user = auth.getUserOrFail()

    if (user.role !== UserRole.recruiter) {
      return response.redirect().toRoute('recruiter')
    }

    return inertia.render('offers/create')
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
