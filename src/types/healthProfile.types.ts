export interface IMedicalHistory {
  hypertension: boolean
  diabetes: boolean
  allergies: string[]
  currentMedications: string[]
}

export interface ILifestyle {
  averageSleepHours: number
  smoker: boolean
  alcoholConsumption: 'none' | 'occasional' | 'regular'
}

export interface IWomenSpecific {
  cycleRegularity: 'regular' | 'irregular'
  lastPeriodDate: string
  averageCycleLength: number
}

export interface IHealthProfile {
  userId: string
  height?: number
  currentWeight?: number
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  goal?: 'lose_weight' | 'gain_weight' | 'maintain' | 'general_health'
  medicalHistory: IMedicalHistory
  lifestyle?: ILifestyle
  womenSpecific?: IWomenSpecific
  onboardingStep: number
  isCompleted: boolean
}

export interface IOnboardingStatus {
  isCompleted: boolean
  currentStep: number
  totalSteps: number
}
