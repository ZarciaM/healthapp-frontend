import { Outlet } from 'react-router-dom'
import { Activity } from 'lucide-react'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Activity className="h-10 w-10 text-blue-600" />
          <h1 className="mt-2 text-2xl font-bold text-gray-900">HealthApp</h1>
        </div>
        <div className="rounded-xl bg-white p-8 shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
