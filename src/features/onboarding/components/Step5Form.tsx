import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const step5Schema = z.object({
  womenSpecific: z.object({
    cycleRegularity: z.enum(['regular', 'irregular'], {
      error: () => ({ message: 'Sélectionnez la régularité' }),
    }),
    lastPeriodDate: z.string().min(1, 'Date requise'),
    averageCycleLength: z.coerce.number().min(15, 'Minimum 15 jours').max(45, 'Maximum 45 jours'),
  }),
})

type Step5FormData = z.infer<typeof step5Schema>

interface Step5FormProps {
  defaultValues?: Partial<Step5FormData>
  onSubmit: (data: Step5FormData) => void
  isSubmitting: boolean
}

export default function Step5Form({ defaultValues, onSubmit, isSubmitting }: Step5FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step5FormData>({
    resolver: zodResolver(step5Schema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Régularité du cycle</label>
        <div className="space-y-2">
          <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 text-sm cursor-pointer hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
            <input type="radio" value="regular" {...register('womenSpecific.cycleRegularity')} className="text-blue-600" />
            <span className="font-medium text-gray-900">Régulier</span>
          </label>
          <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 text-sm cursor-pointer hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
            <input type="radio" value="irregular" {...register('womenSpecific.cycleRegularity')} className="text-blue-600" />
            <span className="font-medium text-gray-900">Ir régulier</span>
          </label>
        </div>
        {errors.womenSpecific?.cycleRegularity?.message && (
          <p className="text-sm text-red-600">{errors.womenSpecific.cycleRegularity.message}</p>
        )}
      </div>

      <Input
        label="Date des dernières règles"
        type="date"
        error={errors.womenSpecific?.lastPeriodDate?.message}
        register={register('womenSpecific.lastPeriodDate')}
      />

      <Input
        label="Durée moyenne du cycle (jours)"
        type="number"
        placeholder="28"
        error={errors.womenSpecific?.averageCycleLength?.message}
        register={register('womenSpecific.averageCycleLength')}
      />

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Terminer
      </Button>
    </form>
  )
}
