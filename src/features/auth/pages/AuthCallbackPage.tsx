import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getMe } from '@/api/auth.api'
import { useAuthStore } from '@/store/authStore'
import Spinner from '@/components/ui/Spinner'

export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const setUser = useAuthStore((s) => s.setUser)
  const [message, setMessage] = useState('Connexion en cours...')

  useEffect(() => {
    let cancelled = false

    async function handleCallback() {
      try {
        const response = await getMe()
        if (cancelled) return

        if (response.data?.user) {
          setUser(response.data.user)
          const onboarding = searchParams.get('onboarding') === 'true'
          navigate(onboarding ? '/onboarding' : '/dashboard', { replace: true })
        } else {
          setMessage('Redirection...')
          navigate('/login', { replace: true })
        }
      } catch {
        if (cancelled) return
        setMessage('Redirection...')
        navigate('/login', { replace: true })
      }
    }

    handleCallback()

    return () => {
      cancelled = true
    }
  }, [navigate, searchParams, setUser])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner />
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  )
}
