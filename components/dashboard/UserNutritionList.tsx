import type { FC } from 'react'

import { UserNutrition } from '@/client/directus/interfaces/UserNutrition'
import Heading from '@/components/layout/Heading'
import UserNutritionListItem from '@/components/dashboard/UserNutritionListItem'

interface UserNutritionListProps {
    userNutrition: UserNutrition[]
}

const UserNutritionList: FC<UserNutritionListProps> = ({ userNutrition }) => {
    return (
        <div className="flex flex-col">
            <Heading>
                <span className="text-grey">{`Today's`}</span> Bytes
            </Heading>
            {userNutrition.map((nutrition) => (
                <UserNutritionListItem
                    key={nutrition.id}
                    nutrition={nutrition}
                />
            ))}
        </div>
    )
}

export default UserNutritionList
