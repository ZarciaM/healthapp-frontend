import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { getMe } from '@/api/auth.api'
import { useAuthStore } from '@/store/authStore'

export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const isLoading = useAuthStore((s) => s.isLoading)
  const setUser = useAuthStore((s) => s.setUser)
  const clearUser = useAuthStore((s) => s.clearUser)
  const setLoading = useAuthStore((s) => s.setLoading)

  const query = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    setLoading(query.isLoading)
  }, [query.isLoading, setLoading])

  useEffect(() => {
    if (query.data?.data?.user) {
      setUser(query.data.data.user)
    }
  }, [query.data, setUser])

  useEffect(() => {
    if (query.isError && query.error instanceof AxiosError && query.error.response?.status === 401) {
      clearUser()
    }
  }, [query.isError, query.error, clearUser])

  return { user, isAuthenticated, isLoading }
}
