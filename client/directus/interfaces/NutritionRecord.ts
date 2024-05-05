import { Nutrition } from '@/client/directus/interfaces/Nutrition'
import { Product } from '@/client/directus/interfaces/Product'
import { UserRaw } from '@/client/directus/interfaces/raw/UserRaw'

export interface NutritionRecord extends Nutrition {
    id?: string
    date?: Date | string
    product?: Partial<Product> | null
    user?: Partial<UserRaw> | null
}
