import { auth } from 'auth'
import { signIn } from 'auth'
import { redirect } from 'next/navigation'
import Button from '@/components/layout/Button'

export default async function Index() {
    const session = await auth()

    if (session?.user) {
        redirect('/dashboard')
    }

    return (
        <div className="w-full h-screen flex flex-row justify-center items-center">
            <form
                action={async () => {
                    'use server'
                    await signIn('google')
                }}
            >
                <Button>Sign in with Google</Button>
            </form>
        </div>
    )
}
