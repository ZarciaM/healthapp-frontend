import apiClient from './axiosClient'
import type { IApiSuccess } from '@/types/api.types'
import type { IHealthProfile, IOnboardingStatus } from '@/types/healthProfile.types'

export function getProfile(): Promise<IApiSuccess<{ profile: IHealthProfile }>> {
  return apiClient.get('/health-profile').then((res) => res.data)
}

export function getStatus(): Promise<IApiSuccess<IOnboardingStatus>> {
  return apiClient.get('/health-profile/status').then((res) => res.data)
}

export function submitStep(step: number, data: object): Promise<IApiSuccess<{ profile: IHealthProfile }>> {
  return apiClient.post(`/health-profile/step/${step}`, data).then((res) => res.data)
}
