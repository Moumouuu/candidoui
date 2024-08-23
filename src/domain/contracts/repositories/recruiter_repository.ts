import { RecruiterCreateDTO } from '#domain/contracts/dto/recruiter_dto'
import Recruiter from '#models/recruiter'

export default abstract class RecruiterRepository {
  abstract create(payload: RecruiterCreateDTO): Promise<Recruiter>

  abstract findByUserId(userId: number): Promise<Recruiter | null>
}
