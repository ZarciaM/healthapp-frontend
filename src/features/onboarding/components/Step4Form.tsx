import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '@/components/ui/Button'

const step4Schema = z.object({
  lifestyle: z.object({
    averageSleepHours: z.coerce.number().min(0, 'Minimum 0 heures').max(24, 'Maximum 24 heures'),
    smoker: z.boolean(),
    alcoholConsumption: z.enum(['none', 'occasional', 'regular'], {
      error: () => ({ message: 'Sélectionnez votre consommation' }),
    }),
  }),
})

type Step4FormData = z.infer<typeof step4Schema>

const alcoholOptions = [
  { value: 'none', label: 'Aucune' },
  { value: 'occasional', label: 'Occasionnelle' },
  { value: 'regular', label: 'Régulière' },
]

interface Step4FormProps {
  defaultValues?: Partial<Step4FormData>
  onSubmit: (data: Step4FormData) => void
  isSubmitting: boolean
}

export default function Step4Form({ defaultValues, onSubmit, isSubmitting }: Step4FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step4FormData>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      lifestyle: { averageSleepHours: 7, smoker: false, alcoholConsumption: 'none' },
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Heures de sommeil par nuit
        </label>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">0</span>
          <input
            type="range"
            min="0"
            max="24"
            step="0.5"
            {...register('lifestyle.averageSleepHours', { valueAsNumber: true })}
            className="w-full accent-blue-600"
          />
          <span className="text-sm text-gray-500">24</span>
        </div>
        {errors.lifestyle?.averageSleepHours?.message && (
          <p className="text-sm text-red-600">{errors.lifestyle.averageSleepHours.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 text-sm cursor-pointer hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
          <input type="checkbox" value="true" {...register('lifestyle.smoker')} className="rounded text-blue-600" />
          <span className="font-medium text-gray-900">Fumeur</span>
        </label>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Consommation d'alcool</label>
        <div className="space-y-2">
          {alcoholOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 text-sm cursor-pointer hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50"
            >
              <input
                type="radio"
                value={opt.value}
                {...register('lifestyle.alcoholConsumption')}
                className="text-blue-600"
              />
              <span className="font-medium text-gray-900">{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.lifestyle?.alcoholConsumption?.message && (
          <p className="text-sm text-red-600">{errors.lifestyle.alcoholConsumption.message}</p>
        )}
      </div>

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Suivant
      </Button>
    </form>
  )
}
