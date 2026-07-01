import { useAuth } from '@/hooks/useAuth'
import AppRouter from '@/routes/AppRouter'

export default function App() {
  useAuth()

  return <AppRouter />
}
