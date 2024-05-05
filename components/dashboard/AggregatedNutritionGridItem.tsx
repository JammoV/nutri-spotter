import type { FC } from 'react'
import Container from '@/components/layout/Container'
import { calculatePercentage } from '@/lib/functions'

interface AggregatedNutritionGridItemProps {
    title: string
    currentValue: number
    targetValue: number
    unit?: 'kcal' | 'g'
}

const AggregatedNutritionGridItem: FC<AggregatedNutritionGridItemProps> = ({
    title,
    currentValue,
    targetValue,
    unit = 'g',
}) => {
    const percentage = calculatePercentage(currentValue, targetValue)

    return (
        <Container classNames="relative flex-1" dark>
            <div className="flex flex-col mb-1">
                <span>{title}</span>
                <span>
                    {parseFloat(currentValue.toString())} {unit}
                </span>
                <span className="text-grey text-sm">
                    {percentage}% {parseFloat(targetValue.toString())} {unit}
                </span>
            </div>
            <div className="absolute bottom-0 left-0 rounded-lg h-2 w-full bg-grey-light"></div>
            <div
                className={`absolute bottom-0 left-0 rounded-lg h-2 bg-primary`}
                style={{
                    width:
                        parseFloat(percentage) > 100
                            ? '100%'
                            : percentage + '%',
                }}
            ></div>
        </Container>
    )
}

export default AggregatedNutritionGridItem
