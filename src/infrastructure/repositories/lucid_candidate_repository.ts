import CandidateRepository from '#domain/contracts/repositories/candidate_repository'
import Candidate from '#models/candidate'

export default class LucidCandidateRepository implements CandidateRepository {
  save(candidate: Candidate): Promise<any> {
    return candidate.save()
  }
}
