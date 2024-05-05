import { getUserNutritions } from '@/client/directus/NutriAPI'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import { User } from '@/client/directus/interfaces/User'
import UserNutritionList from '@/components/dashboard/UserNutritionList'
import AggregatedNutrition from '@/components/dashboard/AggregatedNutrition'
import Button from '@/components/layout/Button'
import Link from 'next/link'

export default async function Page() {
    const session = await auth()

    if (!session?.user) {
        redirect('/')
    }

    const user = session.user as User
    const userNutrition = await getUserNutritions(user.id)

    return (
        <div className="flex flex-col gap-8">
            <AggregatedNutrition user={user} />
            <Link href={'/nutrition/add'}>
                <Button>Add Byte</Button>
            </Link>
            {userNutrition && (
                <UserNutritionList userNutrition={userNutrition} />
            )}
        </div>
    )
}
