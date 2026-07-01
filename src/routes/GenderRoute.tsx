import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

interface GenderRouteProps {
  gender: 'male' | 'female'
}

export default function GenderRoute({ gender }: GenderRouteProps) {
  const user = useAuthStore((state) => state.user)

  if (!user || user.gender !== gender) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
