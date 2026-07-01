import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { z } from 'zod'
import { register as registerApi } from '@/api/auth.api'
import { useAuthStore } from '@/store/authStore'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Alert from '@/components/ui/Alert'

const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z
    .string()
    .min(8, '8 caractères minimum')
    .regex(/[A-Z]/, 'Doit contenir une majuscule')
    .regex(/[0-9]/, 'Doit contenir un chiffre'),
  firstName: z.string().min(1, 'Prénom requis'),
  lastName: z.string().min(1, 'Nom requis'),
  gender: z.enum(['male', 'female'], { required_error: 'Genre requis' }),
  dateOfBirth: z.string().refine(
    (val) => {
      const birth = new Date(val)
      const now = new Date()
      const age = now.getFullYear() - birth.getFullYear()
      const monthDiff = now.getMonth() - birth.getMonth()
      const adjustedAge = monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate()) ? age - 1 : age
      return adjustedAge >= 13
    },
    { message: 'Vous devez avoir au moins 13 ans' },
  ),
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const navigate = useNavigate()
  const setUser = useAuthStore((s) => s.setUser)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setApiError(null)
    try {
      const response = await registerApi(data)
      if (response.data?.user) {
        setUser(response.data.user)
      }
      navigate('/onboarding')
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        setApiError('Cet email est déjà utilisé.')
      } else {
        setApiError('Une erreur est survenue. Veuillez réessayer.')
      }
    }
  }

  return (
    <div>
      <h2 className="mb-6 text-center text-xl font-semibold text-gray-900">Créer un compte</h2>

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
          placeholder="8 caractères min, majuscule, chiffre"
          error={errors.password?.message}
          register={register('password')}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Prénom"
            placeholder="Jean"
            error={errors.firstName?.message}
            register={register('firstName')}
          />
          <Input
            label="Nom"
            placeholder="Dupont"
            error={errors.lastName?.message}
            register={register('lastName')}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Genre</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="radio" value="male" {...register('gender')} className="text-blue-600" />
              Homme
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="radio" value="female" {...register('gender')} className="text-blue-600" />
              Femme
            </label>
          </div>
          {errors.gender?.message && <p className="text-sm text-red-600">{errors.gender.message}</p>}
        </div>

        <Input
          label="Date de naissance"
          type="date"
          error={errors.dateOfBirth?.message}
          register={register('dateOfBirth')}
        />

        <Button type="submit" isLoading={isSubmitting} className="w-full">
          S&apos;inscrire
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Déjà un compte ?{' '}
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Se connecter
        </Link>
      </p>
    </div>
  )
}
