import { Nutrition } from '@/client/directus/interfaces/Nutrition'

export const calculatePercentage = (
    partialValue: number,
    totalValue: number
): string => {
    if (partialValue === 0) return '0'

    return ((partialValue / totalValue) * 100).toFixed(2)
}

export const formatNumber = (value?: number): number => {
    return parseFloat((value || 0).toString())
}

export const calculatePortionNutrition = (
    portionSize: number,
    productNutrition: Nutrition
): Nutrition => {
    const calculatePortionSize = (baseValue: number): number => {
        if (baseValue === 0) return 0

        const size = (baseValue / 100) * portionSize

        return Number(size.toFixed(2))
    }

    return {
        energy: calculatePortionSize(productNutrition.energy),
        fat: calculatePortionSize(productNutrition.fat),
        saturated_fat: calculatePortionSize(productNutrition.saturated_fat),
        unsaturated_fat: calculatePortionSize(productNutrition.unsaturated_fat),
        carbs: calculatePortionSize(productNutrition.carbs),
        sugar: calculatePortionSize(productNutrition.sugar),
        fibres: calculatePortionSize(productNutrition.fibres),
        protein: calculatePortionSize(productNutrition.protein),
        salt: calculatePortionSize(productNutrition.salt),
    }
}

export const calculateStepSize = (portionSize: number): number => {
    if (portionSize > 100) return 50

    if (portionSize > 50) return 10

    if (portionSize > 10) return 5

    return 1
}
