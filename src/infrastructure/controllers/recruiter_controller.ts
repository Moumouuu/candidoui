import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ShowUserHomePresenterUsecase from '#domain/usecases/users/show_user_home_presenter'
import { UserRole } from '#domain/enum/user_role'
import RecruiterCreateUsecase from '#domain/usecases/recruiter/create_recruiter_usecase'
import ToggleUserRoleUsecase from '#domain/usecases/recruiter/toggle_user_role_usecase'
import VerifyUserIsRecruiterUseCase from '#domain/usecases/recruiter/verify_user_is_recruiter_usecase'

@inject()
export default class RecruiterController {
  constructor(
    private readonly showUserHomePresenterUsecase: ShowUserHomePresenterUsecase,
    private recruiterCreateUsecase: RecruiterCreateUsecase,
    private toggleUserRoleUsecase: ToggleUserRoleUsecase,
    private verifyUserIsRecruiterUseCase: VerifyUserIsRecruiterUseCase
  ) {}

  async show({ inertia, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const isRecruiter = await this.verifyUserIsRecruiterUseCase.execute(user)

    if (isRecruiter) {
      return response.redirect().toRoute('offers')
    }

    return inertia.render('recruiter/create', {
      user: this.showUserHomePresenterUsecase.execute(user),
    })
  }

  async create({ request, auth, response }: HttpContext) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { company_name, location, sector_of_activity } = request.only([
      'company_name',
      'location',
      'sector_of_activity',
    ])

    const user = auth.getUserOrFail()

    try {
      await this.recruiterCreateUsecase.execute({
        user,
        company_name,
        location,
        sector_of_activity,
      })

      await this.toggleUserRoleUsecase.execute(user, UserRole.recruiter)
    } catch (error) {
      return response.status(400).send(error.message)
    }

    return response.created()
  }
}
