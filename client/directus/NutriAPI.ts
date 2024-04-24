'use server'

import client from '@/client/directus/Client'

import {
    GetProductQuery,
    GetProductQueryResponse,
} from '@/client/directus/queries/GetProductQuery'
import { Product } from '@/client/directus/interfaces/Product'
import {
    CreateUserMutationVariables,
    CreateUserNutritionMutation,
    CreateUserNutritionMutationResponse,
} from '@/client/directus/mutations/CreateUserNutritionMutation'
import {
    GetProductsQuery,
    GetProductsQueryResponse,
} from '@/client/directus/queries/GetProductsQuery'
import {
    GetUserNutritionAggregatedQuery,
    GetUserNutritionAggregatedQueryResponse,
} from '@/client/directus/queries/GetUserNutritionAggregatedQuery'
import { NutritionData } from '@/client/directus/interfaces/NutritionData'

export const getProduct = async (id: string): Promise<Product | null> => {
    const directusUser = await client.query<GetProductQueryResponse>(
        GetProductQuery,
        { id: id }
    )

    if (!directusUser.products_by_id) {
        return null
    }

    return directusUser.products_by_id
}

export const getProducts = async (
    limit: number,
    searchTerm?: string | null
): Promise<Product[] | null> => {
    const directusUser = await client.query<GetProductsQueryResponse>(
        GetProductsQuery,
        { limit: limit, searchTerm: searchTerm }
    )

    if (!directusUser.products) {
        return null
    }

    return directusUser.products
}

export const createUserNutrition = async (
    input: CreateUserMutationVariables
): Promise<string | null> => {
    const userNutrition =
        await client.query<CreateUserNutritionMutationResponse>(
            CreateUserNutritionMutation,
            {
                userId: input.userId,
                productId: input.productId,
                date: new Date().toISOString().split('T')[0],
                ...input.nutrition,
            }
        )

    return userNutrition.create_ns_user_nutritions_item?.id || null
}

export const getAggregatedUserNutrition = async (
    userId: string,
    date?: string | undefined
): Promise<NutritionData | null> => {
    console.log(new Date().toISOString().split('T')[0])
    console.log(userId)
    console.log(date)
    const nutritionResult =
        await client.query<GetUserNutritionAggregatedQueryResponse>(
            GetUserNutritionAggregatedQuery,
            {
                userId: userId,
                date: date || new Date().toISOString().split('T')[0],
            }
        )

    if (
        !nutritionResult.ns_user_nutrition_aggregated ||
        nutritionResult.ns_user_nutrition_aggregated.length !== 1
    ) {
        return null
    }

    return nutritionResult.ns_user_nutrition_aggregated.shift() || null
}
