import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useOnboarding } from '../hooks/useOnboarding'
import ProgressBar from '@/components/ui/ProgressBar'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import Step1Form from '../components/Step1Form'
import Step2Form from '../components/Step2Form'
import Step3Form from '../components/Step3Form'
import Step4Form from '../components/Step4Form'
import Step5Form from '../components/Step5Form'

export default function OnboardingPage() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const { status, submitStep, isLoading, isSubmitting } = useOnboarding()

  const currentStep = status?.currentStep ?? 0
  const totalSteps = status?.totalSteps ?? 4
  const isCompleted = status?.isCompleted ?? false
  const formStep = currentStep + 1

  const [visibleStep, setVisibleStep] = useState(formStep)

  useEffect(() => {
    setVisibleStep(formStep)
  }, [formStep])

  useEffect(() => {
    if (isCompleted) {
      navigate('/dashboard', { replace: true })
    }
  }, [isCompleted, navigate])

  const handleStepSubmit = useCallback(
    async (data: object) => {
      try {
        await submitStep.mutateAsync({ step: visibleStep, data })
      } catch {
        // Error handling - could show an alert
      }
    },
    [submitStep, visibleStep],
  )

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  const renderForm = () => {
    switch (visibleStep) {
      case 1:
        return <Step1Form onSubmit={handleStepSubmit} isSubmitting={isSubmitting} />
      case 2:
        return <Step2Form onSubmit={handleStepSubmit} isSubmitting={isSubmitting} />
      case 3:
        return <Step3Form onSubmit={handleStepSubmit} isSubmitting={isSubmitting} />
      case 4:
        return <Step4Form onSubmit={handleStepSubmit} isSubmitting={isSubmitting} />
      case 5:
        return <Step5Form onSubmit={handleStepSubmit} isSubmitting={isSubmitting} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-lg px-4">
        <ProgressBar current={currentStep} total={totalSteps} />

        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
          <h1 className="mb-6 text-xl font-semibold text-gray-900">
            Configuration de votre profil
          </h1>

          {renderForm()}

          {visibleStep > 1 && (
            <div className="mt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setVisibleStep((s) => s - 1)}
                className="w-full"
              >
                Précédent
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
