import { ProductStoreData } from '@/client/directus/interfaces/ProductStoreData'
import { Nutrition } from '@/client/directus/interfaces/Nutrition'

export interface Product {
    id: string
    name: string
    brand: {
        id: string
        name: string
    } | null
    portionSize?: number
    weight?: number
    unit?: string
    stores?: ProductStoreData[] | null
    nutrition?: Nutrition
}

export interface ProductCategory {
    id: string
    name: string
}

export interface ProductBrand {
    id: string
    name: string
}

export interface ProductPrice {
    id: string
    price: number
}

export interface ProductSuper {
    id: string
    name: string
}
