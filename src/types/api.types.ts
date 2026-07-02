export interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
  gender: 'male' | 'female'
  dateOfBirth: string
  authProvider: 'local' | 'google'
  isEmailVerified: boolean
  isProfileComplete: boolean
  timezone: string
  createdAt: string
}

export interface IAuthResponse {
  user: IUser
}

export interface IApiError {
  success: false
  message: string
  details?: string
}

export interface IApiSuccess<T = undefined> {
  success: true
  message: string
  data?: T
}
