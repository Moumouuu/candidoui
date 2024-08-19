import Candidate from '#models/candidate'

export default abstract class CandidateRepository {
  abstract save(candidate: Candidate): Promise<any>
}
