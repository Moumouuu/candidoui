// import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async index({ inertia }: any) {
    return inertia.render('home')
  }
}
