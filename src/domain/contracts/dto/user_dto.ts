import { UserRole } from '#domain/enum/user_role'

export class User {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
  role: UserRole

  constructor(
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: UserRole
  ) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.password = password
    this.role = role
  }
}

export interface UserLoginDTO {
  email: string
  password: string
}

export interface UserRegisterDTO {
  first_name: string
  last_name: string
  email: string
  password: string
}
