import { RecruiterCreateDTO } from '#domain/contracts/dto/recruiter_dto'
import User from '#models/user'
import Recruiter from '#models/recruiter'

export default class LucidRecruiterRepository {
  async create({ company_name, location, sector_of_activity, user }: RecruiterCreateDTO & User) {
    const recruiter = await Recruiter.create({
      company_name,
      location,
      sector_of_activity,
    })

    // associate recruiter with user
    await user.related('recruiter').save(recruiter)

    return recruiter
  }

  async findByUserId(userId: number): Promise<Recruiter | null> {
    return Recruiter.findBy('user_id', userId)
  }
}
