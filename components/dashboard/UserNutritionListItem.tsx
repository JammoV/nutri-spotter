'use client'

import type { FC } from 'react'

import { UserNutrition } from '@/client/directus/interfaces/UserNutrition'
import { deleteUserNutrition } from '@/client/directus/NutriAPI'
import Container from '@/components/layout/Container'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import UserNutritionListItemPill from '@/components/dashboard/UserNutritionListItemPill'
import Link from 'next/link'

interface UserNutritionListItemProps {
    nutrition: UserNutrition
}

const UserNutritionListItem: FC<UserNutritionListItemProps> = ({
    nutrition,
}) => {
    const [expanded, setExpanded] = useState<boolean>(false)

    return (
        <Container
            classNames={`cursor-pointer border mb-2 ${expanded ? 'border-primary' : 'border-black'}`}
            onClick={() => setExpanded(!expanded)}
        >
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <span className="font-semibold">
                        {nutrition.product?.name}
                    </span>
                    <div className="flex flex-row gap-4 text-sm">
                        {nutrition.amount && (
                            <span className="text-grey-light">
                                {parseFloat(nutrition.amount.toString())}{' '}
                                {nutrition.product?.unit}
                            </span>
                        )}
                        <span className="text-grey">
                            {nutrition.product?.brand?.name}
                        </span>
                    </div>
                </div>
                <div>
                    <FontAwesomeIcon
                        icon={expanded ? faChevronUp : faChevronDown}
                    />
                </div>
            </div>
            {expanded && (
                <>
                    <div className="flex flex-wrap justify-between gap-1 my-4">
                        <UserNutritionListItemPill
                            title="Energy"
                            value={nutrition.energy}
                            unit="kcal"
                        />
                        <UserNutritionListItemPill
                            title="Protein"
                            value={nutrition.protein}
                        />
                        <UserNutritionListItemPill
                            title="Carbs"
                            value={nutrition.carbs}
                        />
                        <UserNutritionListItemPill
                            title="Sugar"
                            value={nutrition.sugar}
                        />
                        <UserNutritionListItemPill
                            title="Fibres"
                            value={nutrition.fibres}
                        />
                        <UserNutritionListItemPill
                            title="Salt"
                            value={nutrition.salt}
                        />
                        <UserNutritionListItemPill
                            title="Fat"
                            value={nutrition.fat}
                        />
                    </div>
                    <div className="flex flex-row justify-around">
                        <Link
                            className={`text-sm text-grey font-semibold cursor-pointer hover:text-white`}
                            onClick={() => deleteUserNutrition(nutrition.id)}
                            href={`/product/${nutrition.product?.id}`}
                        >
                            view product
                        </Link>
                        <span
                            className={`text-sm text-grey font-semibold cursor-pointer hover:text-white`}
                            onClick={() => deleteUserNutrition(nutrition.id)}
                        >
                            delete byte
                        </span>
                    </div>
                </>
            )}
        </Container>
    )
}

export default UserNutritionListItem
