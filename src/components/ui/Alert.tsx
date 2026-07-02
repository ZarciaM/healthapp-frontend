import type { LucideIcon } from 'lucide-react'
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react'

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
}

const alertStyles: Record<AlertProps['type'], string> = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
}

const icons: Record<AlertProps['type'], LucideIcon> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

export default function Alert({ type, message }: AlertProps) {
  const Icon = icons[type]

  return (
    <div role="alert" className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${alertStyles[type]}`}>
      <Icon className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  )
}
