import { useAuth } from '@/hooks/useAuth'
import AppRouter from '@/routes/AppRouter'
import Spinner from '@/components/ui/Spinner'

export default function App() {
  const { isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return <AppRouter />
}
