import { create } from 'zustand'
import type { IUser } from '@/types/api.types'

interface AuthState {
  user: IUser | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: IUser) => void
  clearUser: () => void
  setLoading: (loading: boolean) => void
  reset: () => void
}

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
}

export const useAuthStore = create<AuthState>()((set) => ({
  ...initialState,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => set(initialState),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set(initialState),
}))
