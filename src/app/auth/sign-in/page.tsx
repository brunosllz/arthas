import { Metadata } from 'next'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SignInGithubButton } from './components/sign-in-github-button'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Authentication forms built using the components.',
}

export default function AuthenticationPage() {
  return (
    <main className="flex h-screen w-full flex-col justify-center">
      <Card className="mx-auto w-full max-w-[400px]">
        <CardHeader>
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription className="text-base">
            to continue to Dev Xperience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInGithubButton />
        </CardContent>

        <CardFooter>
          <span className="flex items-center gap-1 text-sm">
            No account?
            <a href="#" className="text-sm font-bold">
              Sign Up
            </a>
          </span>
        </CardFooter>
      </Card>
    </main>
  )
}
