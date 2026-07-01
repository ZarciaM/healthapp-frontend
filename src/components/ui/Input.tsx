import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  register?: UseFormRegisterReturn
}

const errorId = (name?: string) => (name ? `${name}-error` : undefined)

export default function Input({ label, error, register, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        className={`block w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-400'
        } ${className}`}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId(register?.name) : undefined}
        {...props}
        {...register}
      />
      {error && <p id={errorId(register?.name)} className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
