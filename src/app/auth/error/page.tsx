import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Settings } from 'lucide-react'
import Link from 'next/link'

export default function SignInError() {
  return (
    <div className="wrapper">
      <div className="flex items-center justify-center page-container">
        <Card>
          <CardContent className="mt-6 flex flex-col items-center justify-center gap-6">
            <Settings size={24} className="animate-spin" />

            <div>
              <span className="block text-2xl font-semibold">
                A plataforma ainda está em construção
              </span>
              <span className="block text-center text-muted-foreground">
                O acesso é limite somente a alguns usuário
              </span>
            </div>

            <Button asChild>
              <Link href="/">Voltar para a página inicial</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
