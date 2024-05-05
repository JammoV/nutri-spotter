import type { FC } from 'react'
import Container from '@/components/layout/Container'

interface UserNutritionListItemPillProps {
    title: string
    value: number
    unit?: 'kcal' | 'g'
}

const UserNutritionListItemPill: FC<UserNutritionListItemPillProps> = ({
    title,
    value,
    unit = 'g',
}) => {
    return (
        <Container classNames="p-1 flex-grow" dark>
            <div className="flex flex-col text-sm">
                <span className="font-semibold">{title}</span>
                <span className="text-grey-light">
                    {parseFloat(value.toString())} {unit}
                </span>
            </div>
        </Container>
    )
}

export default UserNutritionListItemPill
