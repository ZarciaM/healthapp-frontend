import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const step1Schema = z.object({
  height: z.number().min(50, 'Minimum 50 cm').max(250, 'Maximum 250 cm'),
  currentWeight: z.number().min(20, 'Minimum 20 kg').max(300, 'Maximum 300 kg'),
})

type Step1FormData = z.infer<typeof step1Schema>

interface Step1FormProps {
  defaultValues?: Partial<Step1FormData>
  onSubmit: (data: Step1FormData) => void
  isSubmitting: boolean
}

export default function Step1Form({ defaultValues, onSubmit, isSubmitting }: Step1FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Taille (cm)"
        type="number"
        placeholder="170"
        error={errors.height?.message}
        register={register('height', { valueAsNumber: true })}
      />
      <Input
        label="Poids actuel (kg)"
        type="number"
        placeholder="70"
        error={errors.currentWeight?.message}
        register={register('currentWeight', { valueAsNumber: true })}
      />
      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Suivant
      </Button>
    </form>
  )
}
