export interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
  gender: 'male' | 'female' | 'other'
  dateOfBirth: string
  role: 'user' | 'admin'
  isOnboarded: boolean
  createdAt: string
  updatedAt: string
}

export interface IAuthResponse {
  user: IUser
  accessToken?: string
}

export interface IRefreshResponse {
  accessToken: string
}
