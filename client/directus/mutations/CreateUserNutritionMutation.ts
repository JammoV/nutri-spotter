import { NutritionData } from '@/client/directus/interfaces/NutritionData'

export const CreateUserNutritionMutation = `
    mutation($userId: ID!, $productId: ID!, $date: Date!, $energy: Float!, $fat: Float!, $saturated_fat: Float!, $unsaturated_fat: Float!, $carbs: Float!, $sugar: Float!, $fibres: Float!, $protein: Float!, $salt: Float!) {
        create_ns_user_nutritions_item(data: {user: {id: $userId}, product: {id: $productId}, date: $date, energy: $energy, fat: $fat, saturated_fat: $saturated_fat, unsaturated_fat: $unsaturated_fat, carbs: $carbs, sugar: $sugar, fibres: $fibres, protein: $protein, salt: $salt}) {
            id
        }
    }
`

export interface CreateUserMutationVariables {
    userId: string
    productId: string
    nutrition: NutritionData
    date?: Date
}

export interface CreateUserNutritionMutationResponse {
    create_ns_user_nutritions_item: {
        id: string
    } | null
}
