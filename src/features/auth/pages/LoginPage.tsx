import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { z } from 'zod'
import { login } from '@/api/auth.api'
import { useAuthStore } from '@/store/authStore'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Alert from '@/components/ui/Alert'

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const navigate = useNavigate()
  const setUser = useAuthStore((s) => s.setUser)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setApiError(null)
    try {
      const response = await login(data)
      if (response.data?.user) {
        setUser(response.data.user)
        navigate(response.data.user.isProfileComplete ? '/dashboard' : '/onboarding')
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        setApiError('Email ou mot de passe incorrect')
      } else {
        setApiError('Une erreur est survenue. Veuillez réessayer.')
      }
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
  }

  return (
    <div>
      <h2 className="mb-6 text-center text-xl font-semibold text-gray-900">Connexion</h2>

      {apiError && <Alert type="error" message={apiError} />}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="vous@exemple.fr"
          error={errors.email?.message}
          register={register('email')}
        />
        <Input
          label="Mot de passe"
          type="password"
          placeholder="Votre mot de passe"
          error={errors.password?.message}
          register={register('password')}
        />

        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Se connecter
        </Button>
      </form>

      <div className="mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">ou</span>
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={handleGoogleLogin}
          className="mt-4 w-full"
        >
          Se connecter avec Google
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        Pas encore de compte ?{' '}
        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
          S&apos;inscrire
        </Link>
      </p>
    </div>
  )
}
