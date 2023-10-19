'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Confetti, { ConfettiProps } from 'react-confetti-explosion'

export default function Onboarding() {
  const props: ConfettiProps = {
    zIndex: 100,
    particleCount: 350,
    duration: 2700,
    force: 0.6,
  }

  return (
    <main className="wrapper">
      <div className="">
        <h1>Bem-vindo a DevXperience</h1>
        <p>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </p>

        <Card>
          <CardContent>
            <form>
              <Input></Input>
            </form>
          </CardContent>
        </Card>
        <Confetti {...props} />
      </div>
    </main>
  )
}
