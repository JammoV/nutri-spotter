import { NutritionData } from '@/client/directus/interfaces/NutritionData'

export const GetUserNutritionAggregatedQuery = `
    query($userId: String!, $date: String!) {
        ns_user_nutrition_aggregated(filter: { user: { id: {_eq: $userId}}, date: { _eq: $date  }}) {
            id
            date
            energy
            fat
            saturated_fat
            unsaturated_fat
            carbs
            sugar
            fibres
            protein
            salt
        }
    }
`

export interface GetUserNutritionAggregatedQueryResponse {
    ns_user_nutrition_aggregated: NutritionData[] | null
}
