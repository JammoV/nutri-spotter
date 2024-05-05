'use client'

import type { FC } from 'react'
import { UserNutritionAggregated } from '@/client/directus/interfaces/UserNutritionAggregated'
import { useState } from 'react'
import AggregatedNutritionGridItem from '@/components/dashboard/AggregatedNutritionGridItem'
import { User } from '@/client/directus/interfaces/User'

interface AggregatedNutritionGridProps {
    nutrition: UserNutritionAggregated
    user: User
}

const AggregatedNutritionGrid: FC<AggregatedNutritionGridProps> = ({
    nutrition,
    user,
}) => {
    const [expanded, setExpanded] = useState<boolean>(false)

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2">
                <AggregatedNutritionGridItem
                    title="Energy"
                    unit="kcal"
                    currentValue={nutrition.energy}
                    targetValue={user.target_energy}
                />
                <AggregatedNutritionGridItem
                    title="Carbs"
                    currentValue={nutrition.carbs}
                    targetValue={user.target_carbs}
                />
                <AggregatedNutritionGridItem
                    title="Protein"
                    currentValue={nutrition.protein}
                    targetValue={user.target_protein}
                />
            </div>
            <div className="text-center">
                <span
                    className={`text-sm text-grey font-semibold cursor-pointer hover:text-white ${expanded && 'text-white'}`}
                    onClick={() => setExpanded(!expanded)}
                >
                    {`show ${expanded ? 'less' : 'more'}`}
                </span>
            </div>
            {expanded && (
                <>
                    <div className="flex flex-row gap-2">
                        <AggregatedNutritionGridItem
                            title="Sugar"
                            currentValue={nutrition.sugar}
                            targetValue={user.target_sugar}
                        />
                        <AggregatedNutritionGridItem
                            title="Fibres"
                            currentValue={nutrition.fibres}
                            targetValue={user.target_fibres}
                        />
                        <AggregatedNutritionGridItem
                            title="Salt"
                            currentValue={nutrition.salt}
                            targetValue={user.target_salt}
                        />
                    </div>
                    <div className="flex flex-row gap-2">
                        <AggregatedNutritionGridItem
                            title="Fat"
                            currentValue={nutrition.fat}
                            targetValue={user.target_fat}
                        />
                        <AggregatedNutritionGridItem
                            title="Sat. Fat"
                            currentValue={nutrition.saturated_fat}
                            targetValue={user.target_saturated_fat}
                        />
                        <AggregatedNutritionGridItem
                            title="Unsat. Fat"
                            currentValue={nutrition.unsaturated_fat}
                            targetValue={user.target_unsaturated_fat}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default AggregatedNutritionGrid
