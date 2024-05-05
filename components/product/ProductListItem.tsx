'use client'

import type { FC } from 'react'

import Container from '@/components/layout/Container'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChevronUp,
    faChevronDown,
    faMinus,
    faPlus,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { Product } from '@/client/directus/interfaces/Product'
import Link from 'next/link'
import {
    calculatePortionNutrition,
    calculateStepSize,
    formatNumber,
} from '@/lib/functions'
import Button from '@/components/layout/Button'
import { createUserNutrition } from '@/client/directus/NutriAPI'
import { useSession } from 'next-auth/react'

interface ProductListItemProps {
    product: Product
}

const ProductListItem: FC<ProductListItemProps> = ({ product }) => {
    const { data: session } = useSession()

    const [expanded, setExpanded] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [size, setSize] = useState<number>(
        formatNumber(product.portionSize || 10)
    )

    const stepSize = calculateStepSize(product.portionSize || 1)

    const increment = (): void => {
        setSize((oldSize) => oldSize + stepSize)
    }

    const decrement = (): void => {
        setSize((oldSize) => oldSize - stepSize)
    }

    const submitUserNutrition = async () => {
        if (!session?.user?.id || !product.nutrition) {
            return
        }

        setLoading(true)

        const calculatedPortionNutrition = calculatePortionNutrition(
            size,
            product.nutrition
        )

        const userNutritionResult = await createUserNutrition({
            userId: session.user.id,
            productId: product.id,
            amount: size,
            nutrition: calculatedPortionNutrition,
        })

        // if (userNutritionResult) {
        //     setResultMsg(
        //         `Voedingswaardes succesvol opgeslagen (${userNutritionResult.id})`
        //     )
        // } else {
        //     setResultMsg(
        //         `Er ging iets mis bij het opslaan van de voedingswaardes`
        //     )
        // }

        setLoading(false)
    }

    return (
        <Container
            classNames={`border ${expanded ? 'border-primary' : 'border-black'}`}
        >
            <div
                className="flex flex-row items-center justify-between cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex flex-row gap-4 items-center">
                    <span className="font-semibold">{product.name}</span>
                    <div className="flex flex-row gap-2 text-grey text-sm">
                        <span>
                            {formatNumber(product.weight)}
                            {product.unit}
                        </span>
                        <span>{product.brand?.name}</span>
                    </div>
                </div>
                <div>
                    <FontAwesomeIcon
                        icon={expanded ? faChevronUp : faChevronDown}
                    />
                </div>
            </div>
            {expanded && (
                <div className="flex flex-row items-center justify-between mt-4">
                    <Link
                        className={`text-sm text-grey font-semibold cursor-pointer hover:text-white`}
                        href={`/product/${product.id}`}
                    >
                        view product
                    </Link>
                    <div className="flex flex-row items-center gap-2">
                        <button
                            className="flex justify-center text-grey-light items-center bg-container rounded-full p-2 hover:bg-black hover:text-white"
                            onClick={() => decrement()}
                            disabled={loading}
                        >
                            <FontAwesomeIcon
                                icon={faMinus}
                                size={'sm'}
                                className="text-grey-light hover:text-white"
                            />
                        </button>
                        <input
                            type="text"
                            onChange={(e) =>
                                setSize(formatNumber(Number(e.target.value)))
                            }
                            value={size > 0 ? size : ''}
                            className="w-12 p-2 bg-black text-right rounded"
                        ></input>
                        <span>{product.unit}</span>

                        <button
                            className="flex justify-center text-grey-light items-center bg-container rounded-full p-2 hover:bg-black hover:text-white"
                            onClick={() => increment()}
                            disabled={loading}
                        >
                            <FontAwesomeIcon icon={faPlus} size={'sm'} />
                        </button>
                        <Button
                            small
                            onClick={() => submitUserNutrition()}
                            classNames="ml-4"
                        >
                            {loading ? (
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    size={'sm'}
                                    className="animate-spin"
                                />
                            ) : (
                                'Add'
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </Container>
    )
}

export default ProductListItem
