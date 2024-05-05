'use client'

import type { FC } from 'react'
import { Nutrition } from '@/client/directus/interfaces/Nutrition'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { createUserNutrition } from '@/client/directus/NutriAPI'
import NutritionTable from '@/components/product/NutritionTable'
import { calculatePortionNutrition } from '@/lib/functions'

interface ProductNutritionTableProps {
    productNutrition: Nutrition
    productId: string
    portionSize: number
}

const ProductNutritionTable: FC<ProductNutritionTableProps> = ({
    productNutrition,
    productId,
    portionSize,
}) => {
    const { data: session } = useSession()

    const [size, setSize] = useState<number>(portionSize)
    const [loading, setLoading] = useState<boolean>(false)
    const [portionNutrition, setPortionNutrition] = useState<Nutrition>(
        calculatePortionNutrition(size, productNutrition)
    )
    const [resultMsg, setResultMsg] = useState<string | null>(null)

    useEffect(() => {
        setPortionNutrition(calculatePortionNutrition(size, productNutrition))
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
            amount: size,
            nutrition: portionNutrition,
        })

        if (userNutritionResult) {
            setResultMsg(
                `Voedingswaardes succesvol opgeslagen (${userNutritionResult.id})`
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
