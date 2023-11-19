import { Card, CardContent } from '@/components/ui/card'
import { MultiStepRoot, MultiStepContent } from '../components/multi-step'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Confetti } from '@/components/confetti'

import {
  ArrowRight,
  ClipboardEdit,
  LucideIcon,
  Network,
  Users,
} from 'lucide-react'

type CardItems = {
  icon: LucideIcon
  text: string
}

const cardItens: CardItems[] = [
  {
    icon: ClipboardEdit,
    text: 'De vida a seus projetos que estão no papel',
  },

  {
    icon: Users,
    text: 'Faça parte de diversas equipes',
  },

  {
    icon: Network,
    text: 'Aumente seu portfólio e faça novas conexões',
  },
]

export default function OnboardingWelcome() {
  return (
    <div>
      <Confetti />

      <MultiStepRoot currentStep={3} size={3}>
        <MultiStepContent className="mb-[4.5rem]" />
      </MultiStepRoot>

      <div className="mt-2 space-y-3">
        <strong className="text-xl font-semibold">
          Parabéns sua conta foi criada
        </strong>
        <p>
          Aproveite ao máximo, tire suas idéias do papel, aumente seu portfólio,
          crie e participe de projetos incriveis!
        </p>
      </div>

      <div className="mt-8 space-y-3">
        {cardItens.map(({ icon: Icon, text }, index) => (
          <Card key={index}>
            <CardContent className="flex items-center gap-[10px] p-6 pb-0">
              <Icon size={18} />
              <span className="text-sm">{text}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button asChild className="mt-8 w-full">
        <Link href="/">
          Continuar para plataforma <ArrowRight size={16} className="ml-1.5" />
        </Link>
      </Button>
    </div>
  )
}
