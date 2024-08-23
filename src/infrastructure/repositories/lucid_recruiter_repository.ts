import { RecruiterCreateDTO } from '#domain/contracts/dto/recruiter_dto'
import Recruiter from '#models/recruiter'

export default class LucidRecruiterRepository {
  async create({ company_name, location, sector_of_activity, user }: RecruiterCreateDTO) {
    const recruiter = await Recruiter.create({
      company_name,
      location,
      sector_of_activity,
    })

    if (!user) {
      throw new Error('User is required')
    }

    // associate recruiter with user
    await user.related('recruiter').save(recruiter)

    return recruiter
  }

  async findByUserId(userId: number): Promise<Recruiter | null> {
    return Recruiter.findBy('user_id', userId)
  }
}
