import CandidateRepository from '#domain/contracts/repositories/candidate_repository'
import Candidate from '#models/candidate'

export default class LucidCandidateRepository implements CandidateRepository {
  save(candidate: Candidate): Promise<any> {
    return candidate.save()
  }

  findById(id: number): Promise<Candidate> {
    return Candidate.findOrFail(id)
  }

  findCandidateByUserId(userId: number): Promise<Candidate> {
    return Candidate.query().where('user_id', userId).firstOrFail()
  }
}
