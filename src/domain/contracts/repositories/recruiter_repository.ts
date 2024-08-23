import { RecruiterCreateDTO } from '#domain/contracts/dto/recruiter_dto'
import Recruiter from '#models/recruiter'
import User from '#models/user'

export default abstract class RecruiterRepository {
  abstract create(payload: RecruiterCreateDTO & User): Promise<Recruiter>

  abstract findByUserId(userId: number): Promise<Recruiter | null>
}
