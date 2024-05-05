import type { FC } from 'react'
import Container from '@/components/layout/Container'
import { getAggregatedUserNutrition } from '@/client/directus/NutriAPI'
import AggregatedNutritionGrid from '@/components/dashboard/AggregatedNutritionGrid'
import { User } from '@/client/directus/interfaces/User'
import Heading from '@/components/layout/Heading'

interface AggregatedNutritionProps {
    user: User
}

const AggregatedNutrition: FC<AggregatedNutritionProps> = async ({ user }) => {
    const nutrition = await getAggregatedUserNutrition(user.id)

    return (
        <Container>
            <Heading>
                <span className="text-grey">{`Today's`}</span> Nutrition
            </Heading>
            <AggregatedNutritionGrid nutrition={nutrition} user={user} />
        </Container>
    )
}

export default AggregatedNutrition
