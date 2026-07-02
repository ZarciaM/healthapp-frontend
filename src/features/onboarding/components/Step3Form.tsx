import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, X } from 'lucide-react'
import Button from '@/components/ui/Button'

const step3Schema = z.object({
  medicalHistory: z.object({
    hypertension: z.boolean(),
    diabetes: z.boolean(),
    allergies: z.array(z.string().min(1, 'Veuillez remplir ou supprimer ce champ')),
    currentMedications: z.array(z.string().min(1, 'Veuillez remplir ou supprimer ce champ')),
  }),
})

type Step3FormData = z.infer<typeof step3Schema>

interface Step3FormProps {
  defaultValues?: Partial<Step3FormData>
  onSubmit: (data: Step3FormData) => void
  isSubmitting: boolean
}

export default function Step3Form({ defaultValues, onSubmit, isSubmitting }: Step3FormProps) {
  const {
    register,
    handleSubmit,
    control,
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      medicalHistory: { hypertension: false, diabetes: false, allergies: [''], currentMedications: [''] },
      ...defaultValues,
    },
  })

  const allergyHelpers = useFieldArray({ control: control as any, name: 'medicalHistory.allergies' })
  const allergyFields = allergyHelpers.fields
  const addAllergy: (value: string) => void = (value) => allergyHelpers.append(value)
  const removeAllergy: (index: number) => void = (index) => allergyHelpers.remove(index)

  const medHelpers = useFieldArray({ control: control as any, name: 'medicalHistory.currentMedications' })
  const medFields = medHelpers.fields
  const addMed: (value: string) => void = (value) => medHelpers.append(value)
  const removeMed: (index: number) => void = (index) => medHelpers.remove(index)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Antécédents médicaux</label>

        <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 text-sm cursor-pointer hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
          <input type="checkbox" value="true" {...register('medicalHistory.hypertension')} className="rounded text-blue-600" />
          <span className="font-medium text-gray-900">Hypertension</span>
        </label>

        <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 text-sm cursor-pointer hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
          <input type="checkbox" value="true" {...register('medicalHistory.diabetes')} className="rounded text-blue-600" />
          <span className="font-medium text-gray-900">Diabète</span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Allergies</label>
        {allergyFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <input
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Allergie"
              {...register(`medicalHistory.allergies.${index}`)}
            />
            <button type="button" onClick={() => removeAllergy(index)} className="shrink-0 text-gray-400 hover:text-red-500">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addAllergy('')}
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-500"
        >
          <Plus className="h-4 w-4" /> Ajouter une allergie
        </button>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Médicaments actuels</label>
        {medFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <input
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Médicament"
              {...register(`medicalHistory.currentMedications.${index}`)}
            />
            <button type="button" onClick={() => removeMed(index)} className="shrink-0 text-gray-400 hover:text-red-500">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addMed('')}
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-500"
        >
          <Plus className="h-4 w-4" /> Ajouter un médicament
        </button>
      </div>

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Suivant
      </Button>
    </form>
  )
}
