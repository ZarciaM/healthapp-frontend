import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getStatus, submitStep as submitStepApi } from '@/api/healthProfile.api'

export function useOnboarding() {
  const queryClient = useQueryClient()

  const { data: status, isLoading } = useQuery({
    queryKey: ['onboarding', 'status'],
    queryFn: getStatus,
    retry: false,
  })

  const submitStepMutation = useMutation({
    mutationFn: ({ step, data }: { step: number; data: object }) => submitStepApi(step, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboarding', 'status'] })
    },
  })

  return {
    status: status?.data ?? null,
    submitStep: submitStepMutation,
    isLoading,
    isSubmitting: submitStepMutation.isPending,
  }
}
