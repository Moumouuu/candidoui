import User from '#models/user'

export interface RecruiterCreateDTO {
  company_name: string
  location: string
  sector_of_activity: string
  user?: User
}
