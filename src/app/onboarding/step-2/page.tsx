import {
  MultiStepLabel,
  MultiStepRoot,
  MultiStepContent,
} from '../components/multi-step'
import { SecondStepForm } from './components/second-step-form'
import { BackButton } from '../components/back-button'
import { getOnboardingItensFromCms } from '@/actions/get-onboarding-itens-from-cms'

export default async function OnboardingSecondStep() {
  const { roles, seniorities } = await getOnboardingItensFromCms()

  return (
    <div>
      <MultiStepRoot currentStep={2} size={3}>
        <MultiStepContent className="mb-[4.5rem]" />

        <BackButton />
        <MultiStepLabel />
      </MultiStepRoot>

      <div className="mt-2 space-y-3">
        <strong className="text-xl font-semibold">Configure seu Perfil</strong>

        <p>
          Compartilhe sua localização, empresa em que atua, função e nível para
          uma experiência personalizada.
        </p>
      </div>

      <SecondStepForm rolesItens={roles} senioritiesItens={seniorities} />
    </div>
  )
}
