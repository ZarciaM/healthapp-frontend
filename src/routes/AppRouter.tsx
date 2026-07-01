import { Routes, Route } from 'react-router-dom'
import LandingPage from '@/features/landing/pages/LandingPage'
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import AuthCallbackPage from '@/features/auth/pages/AuthCallbackPage'
import OnboardingPage from '@/features/onboarding/pages/OnboardingPage'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import BmiPage from '@/features/bmi/pages/BmiPage'
import WeightPage from '@/features/weight/pages/WeightPage'
import CaloriesPage from '@/features/calories/pages/CaloriesPage'
import WaterPage from '@/features/water/pages/WaterPage'
import SleepPage from '@/features/sleep/pages/SleepPage'
import BloodPressurePage from '@/features/bloodPressure/pages/BloodPressurePage'
import HeartRatePage from '@/features/heartRate/pages/HeartRatePage'
import BodyFatPage from '@/features/bodyFat/pages/BodyFatPage'
import MedicationPage from '@/features/medication/pages/MedicationPage'
import HydrationPage from '@/features/hydration/pages/HydrationPage'
import MenstrualCyclePage from '@/features/women/menstrualCycle/pages/MenstrualCyclePage'
import PregnancyPage from '@/features/women/pregnancy/pages/PregnancyPage'
import SettingsPage from '@/features/settings/pages/SettingsPage'
import PrivateRoute from './PrivateRoute'
import GenderRoute from './GenderRoute'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/bmi" element={<BmiPage />} />
        <Route path="/weight" element={<WeightPage />} />
        <Route path="/calories" element={<CaloriesPage />} />
        <Route path="/water" element={<WaterPage />} />
        <Route path="/sleep" element={<SleepPage />} />
        <Route path="/blood-pressure" element={<BloodPressurePage />} />
        <Route path="/heart-rate" element={<HeartRatePage />} />
        <Route path="/body-fat" element={<BodyFatPage />} />
        <Route path="/medication" element={<MedicationPage />} />
        <Route path="/hydration" element={<HydrationPage />} />

        <Route element={<GenderRoute gender="female" />}>
          <Route path="/women/cycle" element={<MenstrualCyclePage />} />
          <Route path="/women/pregnancy" element={<PregnancyPage />} />
        </Route>

        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
