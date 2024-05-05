import { Nutrition } from '@/client/directus/interfaces/Nutrition'
import { User } from '@/client/directus/interfaces/User'

export interface UserNutritionAggregated extends Nutrition {
    id?: string
    date: string
    user: User | null
}
