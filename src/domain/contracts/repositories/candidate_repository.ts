import Candidate from '#models/candidate'

export default abstract class CandidateRepository {
  abstract save(candidate: Candidate): Promise<Candidate>
  abstract findById(id: number): Promise<Candidate>
  abstract findCandidateByUserId(userId: number): Promise<Candidate>
}
