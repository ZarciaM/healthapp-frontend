import { Link, Navigate } from 'react-router-dom'
import { Activity, Apple, Droplets, Heart, Moon, Weight, Zap } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import Button from '@/components/ui/Button'

const features = [
  { icon: Weight, title: 'IMC & Poids', desc: 'Suivez votre indice de masse corporelle et votre poids' },
  { icon: Apple, title: 'Calories', desc: 'Comptez vos apports et dépenses caloriques' },
  { icon: Droplets, title: 'Hydratation', desc: 'Suivez votre consommation d\'eau quotidienne' },
  { icon: Moon, title: 'Sommeil', desc: 'Analysez la durée et la qualité de votre sommeil' },
  { icon: Heart, title: 'Tension', desc: 'Surveillez votre pression artérielle' },
  { icon: Zap, title: 'Rythme cardiaque', desc: 'Gardez un œil sur votre fréquence cardiaque' },
]

export default function LandingPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-900">HealthApp</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Se connecter
            </Link>
            <Link to="/register">
              <Button size="sm">S&apos;inscrire</Button>
            </Link>
          </nav>
        </div>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Prenez soin de votre santé au quotidien
        </h1>
        <p className="mt-4 max-w-xl text-lg text-gray-600">
          Suivez votre poids, votre alimentation, votre sommeil et bien plus. Une application sobre,
          médicale, conçue pour vous accompagner durablement.
        </p>
        <div className="mt-8 flex gap-4">
          <Link to="/register">
            <Button size="lg">S&apos;inscrire gratuitement</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="lg">
              Se connecter
            </Button>
          </Link>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-gray-900">Fonctionnalités</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="mt-1 text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 px-4 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} HealthApp. Tous droits réservés.
      </footer>
    </div>
  )
}
