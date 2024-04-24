'use client'

import type { FC } from 'react'
import { NutritionData } from '@/client/directus/interfaces/NutritionData'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { createUserNutrition } from '@/client/directus/NutriAPI'
import NutritionTable from '@/components/product/NutritionTable'

interface ProductNutritionTableProps {
    productNutrition: NutritionData
    productId: string
    portionSize: number
}

const ProductNutritionTable: FC<ProductNutritionTableProps> = ({
    productNutrition,
    productId,
    portionSize,
}) => {
    const { data: session } = useSession()

    const calculatePortionNutrition = (): NutritionData => {
        const calculatePortionSize = (baseValue: number): number => {
            if (baseValue === 0) return 0

            const portionSize = (baseValue / 100) * size

            return Number(portionSize.toFixed(2))
        }

        return {
            energy: calculatePortionSize(productNutrition.energy),
            fat: calculatePortionSize(productNutrition.fat),
            saturated_fat: calculatePortionSize(productNutrition.saturated_fat),
            unsaturated_fat: calculatePortionSize(
                productNutrition.unsaturated_fat
            ),
            carbs: calculatePortionSize(productNutrition.carbs),
            sugar: calculatePortionSize(productNutrition.sugar),
            fibres: calculatePortionSize(productNutrition.fibres),
            protein: calculatePortionSize(productNutrition.protein),
            salt: calculatePortionSize(productNutrition.salt),
        }
    }

    const [size, setSize] = useState<number>(portionSize)
    const [loading, setLoading] = useState<boolean>(false)
    const [portionNutrition, setPortionNutrition] = useState<NutritionData>(
        calculatePortionNutrition()
    )
    const [resultMsg, setResultMsg] = useState<string | null>(null)

    useEffect(() => {
        setPortionNutrition(calculatePortionNutrition())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size])

    const submitUserNutrition = async () => {
        if (!session?.user?.id) {
            return
        }

        setLoading(true)

        const userNutritionResult = await createUserNutrition({
            userId: session?.user?.id,
            productId: productId,
            nutrition: portionNutrition,
        })

        if (userNutritionResult) {
            setResultMsg(
                `Voedingswaardes succesvol opgeslagen (${userNutritionResult})`
            )
        } else {
            setResultMsg(
                `Er ging iets mis bij het opslaan van de voedingswaardes`
            )
        }

        setLoading(false)
    }

    return (
        <div>
            {resultMsg && <span>{resultMsg}</span>}
            <div className="flex flex-row gap-4 my-2">
                <input
                    type="number"
                    onChange={(e) => setSize(Number(e.target.value))}
                    value={size}
                    min={1}
                    max={1000}
                    className="border  px-4 w-full"
                />
                <button
                    onClick={() => submitUserNutrition()}
                    className="border p-2 bg-white disabled:bg-grey"
                    disabled={loading}
                >
                    Opslaan
                </button>
            </div>
            <NutritionTable
                columnLeftTitle={'per 100g'}
                columnRightTitle={`per ${size} g`}
                columnLeft={productNutrition}
                columnRight={portionNutrition}
            />
        </div>
    )
}

export default ProductNutritionTable
