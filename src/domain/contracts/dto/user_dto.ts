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

export interface UserProfileUpdateDTO {
  first_name: string
  last_name: string
  email: string
  location?: string | undefined
  portfolio_link?: string | undefined
}
