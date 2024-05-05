'use server'

import client from '@/client/directus/Client'
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache'

import { Product } from '@/client/directus/interfaces/Product'
import { createItem, readItem, readItems, updateItem } from '@directus/sdk'
import { UserNutrition } from '@/client/directus/interfaces/UserNutrition'
import { UserNutritionAggregated } from '@/client/directus/interfaces/UserNutritionAggregated'
import { Nutrition } from '@/client/directus/interfaces/Nutrition'

export const getProduct = async (id: string): Promise<Product | null> => {
    return await client.request(
        readItem('products', id, {
            fields: [
                '*',
                {
                    brand: ['id', 'name'],
                },
                {
                    nutrition: ['*'],
                },
            ],
        })
    )
}

export const getProducts = async (
    limit: number,
    searchTerm?: string
): Promise<Product[] | null> => {
    return await client.request(
        readItems('products', {
            fields: [
                '*',
                {
                    nutrition: ['*'],
                },
                {
                    brand: ['id', 'name'],
                },
            ],
            limit: limit,
            search: searchTerm,
        })
    )
}

export const createUserNutrition = async (input: {
    userId: string
    productId: string
    amount: number
    nutrition: Nutrition
    date?: Date
}): Promise<UserNutrition | null> => {
    revalidateTag('nutrition')
    revalidatePath('/dashboard')

    return await client.request(
        createItem('ns_user_nutritions', {
            // @ts-ignore
            user: {
                id: input.userId,
            },
            // @ts-ignore
            product: {
                id: input.productId,
            },
            amount: input.amount,
            date: new Date().toISOString().split('T')[0],
            ...input.nutrition,
        })
    )
}

export const deleteUserNutrition = async (id: string): Promise<void> => {
    await client.request(
        updateItem('ns_user_nutritions', id, {
            active: false,
        })
    )

    revalidateTag('nutrition')
    revalidatePath('/dashboard')

    return
}

export const getUserNutritions = unstable_cache(
    async (
        userId: string,
        date?: string | undefined
    ): Promise<UserNutrition[] | null> => {
        return await client.request(
            readItems('ns_user_nutritions', {
                fields: [
                    '*',
                    {
                        product: [
                            'id',
                            'name',
                            'unit',
                            { brand: ['id', 'name'] },
                        ],
                    },
                ],
                filter: {
                    user: {
                        id: {
                            _eq: userId,
                        },
                    },
                    date: {
                        _eq: date || new Date().toISOString().split('T')[0],
                    },
                    active: {
                        _eq: true,
                    },
                },
            })
        )
    },
    ['nutrition'],
    {
        tags: ['nutrition'],
    }
)

export const getAggregatedUserNutrition = unstable_cache(
    async (
        userId: string,
        date?: string | undefined
    ): Promise<UserNutritionAggregated> => {
        const reqDate = date || new Date().toISOString().split('T')[0]
        const aggregations = await client.request(
            readItems('ns_user_nutrition_aggregated', {
                filter: {
                    user: {
                        id: {
                            _eq: userId,
                        },
                    },
                    date: {
                        _eq: reqDate,
                    },
                },
            })
        )

        if (!aggregations || aggregations.length !== 1) {
            return {
                user: null,
                date: reqDate,
                energy: 0,
                fat: 0,
                saturated_fat: 0,
                unsaturated_fat: 0,
                carbs: 0,
                fibres: 0,
                sugar: 0,
                protein: 0,
                salt: 0,
            }
        }

        return aggregations[0]
    },
    ['nutrition'],
    {
        tags: ['nutrition'],
    }
)
