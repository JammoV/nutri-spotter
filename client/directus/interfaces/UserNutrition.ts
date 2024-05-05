import { Nutrition } from '@/client/directus/interfaces/Nutrition'
import { Product } from '@/client/directus/interfaces/Product'
import { User } from '@/client/directus/interfaces/User'

export interface UserNutrition extends Nutrition {
    id: string
    date: string
    product: Product | null
    user: User | null
    amount: number
}
