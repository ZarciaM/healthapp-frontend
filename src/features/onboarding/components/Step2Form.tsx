import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '@/components/ui/Button'

const step2Schema = z.object({
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active'], {
    error: () => ({ message: 'Sélectionnez votre niveau d\'activité' }),
  }),
  goal: z.enum(['lose_weight', 'gain_weight', 'maintain', 'general_health'], {
    error: () => ({ message: 'Sélectionnez votre objectif' }),
  }),
})

type Step2FormData = z.infer<typeof step2Schema>

const activityOptions = [
  { value: 'sedentary', label: 'Sédentaire', description: "Peu ou pas d'exercice" },
  { value: 'light', label: 'Légèrement actif', description: 'Exercice 1-3 jours/semaine' },
  { value: 'moderate', label: 'Modérément actif', description: 'Exercice 3-5 jours/semaine' },
  { value: 'active', label: 'Très actif', description: 'Exercice 6-7 jours/semaine' },
  { value: 'very_active', label: 'Extrêmement actif', description: 'Exercice intense quotidien' },
]

const goalOptions = [
  { value: 'lose_weight', label: 'Perdre du poids' },
  { value: 'gain_weight', label: 'Prendre du poids' },
  { value: 'maintain', label: 'Maintenir' },
  { value: 'general_health', label: 'Santé générale' },
]

interface Step2FormProps {
  defaultValues?: Partial<Step2FormData>
  onSubmit: (data: Step2FormData) => void
  isSubmitting: boolean
}

export default function Step2Form({ defaultValues, onSubmit, isSubmitting }: Step2FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Niveau d'activité</label>
        <div className="space-y-2">
          {activityOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 text-sm cursor-pointer hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50"
            >
              <input
                type="radio"
                value={opt.value}
                {...register('activityLevel')}
                className="text-blue-600"
              />
              <div>
                <span className="font-medium text-gray-900">{opt.label}</span>
                <p className="text-gray-500">{opt.description}</p>
              </div>
            </label>
          ))}
        </div>
        {errors.activityLevel?.message && (
          <p className="text-sm text-red-600">{errors.activityLevel.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Objectif</label>
        <div className="space-y-2">
          {goalOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 text-sm cursor-pointer hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50"
            >
              <input
                type="radio"
                value={opt.value}
                {...register('goal')}
                className="text-blue-600"
              />
              <span className="font-medium text-gray-900">{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.goal?.message && (
          <p className="text-sm text-red-600">{errors.goal.message}</p>
        )}
      </div>

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Suivant
      </Button>
    </form>
  )
}
