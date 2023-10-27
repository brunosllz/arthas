import {
  MultiStepLabel,
  MultiStepRoot,
  MultiStepContent,
} from '../components/multi-step'
import { FirstStepForm } from './components/first-step-form'

export default function OnboardingFistStep() {
  return (
    <div>
      <MultiStepRoot currentStep={1} size={3}>
        <MultiStepContent className="mb-[4.5rem]" />

        <MultiStepLabel />
      </MultiStepRoot>

      <div className="mt-2 space-y-3">
        <strong className="text-xl font-semibold">Configure seu Perfil</strong>
        <p>
          Personalize sua experiência compartilhando detalhes importantes sobre
          você e sua carreira.
        </p>
      </div>

      <FirstStepForm />
    </div>
  )
}
