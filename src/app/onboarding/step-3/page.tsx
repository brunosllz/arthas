import {
  MultiStepLabel,
  MultiStepRoot,
  MultiStepContent,
} from '../components/multi-step'
import { Browser } from '../components/browser'
import { BackButton } from '../components/back-button'
import { ThirdStepForm } from './components/third-step-form'

export default function OnboardingThirdStep() {
  return (
    <div>
      <MultiStepRoot currentStep={3} size={3}>
        <MultiStepContent className="mb-[4.5rem]" />

        <BackButton />
        <MultiStepLabel />
      </MultiStepRoot>

      <div className="mt-2 space-y-3">
        <strong className="text-xl font-semibold">Configure seu Perfil</strong>

        <p>
          Agora fale um pouco mais sobre você, atribua suas habilidades para
          personalizar sua experiência.
        </p>
      </div>

      <ThirdStepForm />
    </div>
  )
}
