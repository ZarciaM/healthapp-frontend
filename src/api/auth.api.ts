import apiClient from './axiosClient'
import type { IApiSuccess, IAuthResponse, IUser } from '@/types/api.types'

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  gender: 'male' | 'female'
  dateOfBirth: string
}

export function register(data: RegisterData): Promise<IApiSuccess<IAuthResponse>> {
  return apiClient.post('/auth/register', data).then((res) => res.data)
}

export function login(data: LoginData): Promise<IApiSuccess<IAuthResponse>> {
  return apiClient.post('/auth/login', data).then((res) => res.data)
}

export function logout(): Promise<void> {
  return apiClient.post('/auth/logout').then(() => undefined)
}

export function refreshToken(): Promise<void> {
  return apiClient.post('/auth/refresh').then(() => undefined)
}

export function getMe(): Promise<IApiSuccess<{ user: IUser }>> {
  return apiClient.get('/auth/me').then((res) => res.data)
}
