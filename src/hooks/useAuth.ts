import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMe } from '@/api/auth.api'
import { useAuthStore } from '@/store/authStore'

export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const setUser = useAuthStore((s) => s.setUser)
  const clearUser = useAuthStore((s) => s.clearUser)

  const query = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    if (query.data?.data?.user) {
      setUser(query.data.data.user)
    }
  }, [query.data, setUser])

  useEffect(() => {
    if (query.isError) {
      clearUser()
    }
  }, [query.isError, clearUser])

  return { user, isAuthenticated, isLoading: query.isLoading }
}
