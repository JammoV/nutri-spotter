import { auth } from 'auth'
import { signIn } from 'auth'
import { redirect } from 'next/navigation'

export default async function Index() {
    const session = await auth()

    if (session?.user) {
        redirect('/dashboard')
    }

    return (
        <div className="flex flex-col gap-6">
            <form
                action={async () => {
                    'use server'
                    await signIn('google')
                }}
            >
                <button>Sign In</button>
            </form>
        </div>
    )
}
