import { ProductStoreData } from '@/client/directus/interfaces/ProductStoreData'
import { NutritionData } from '@/client/directus/interfaces/NutritionData'

export interface Product {
    id: string
    name: string
    brand: {
        id: string
        name: string
    } | null
    portionSize: number
    weight: number
    unit: string
    stores?: ProductStoreData[]
    nutrition?: NutritionData
}
