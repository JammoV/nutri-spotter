import { Session } from '@/client/directus/interfaces/Session'
import { UserRaw } from '@/client/directus/interfaces/raw/UserRaw'
import { NutritionRecord } from '@/client/directus/interfaces/NutritionRecord'
import {
    Product,
    ProductPrice,
    ProductSuper,
    ProductCategory,
    ProductBrand,
} from '@/client/directus/interfaces/Product'
import { ProductStoreData } from '@/client/directus/interfaces/ProductStoreData'
import { ProductStore } from '@/client/directus/interfaces/ProductStore'
import { VerificationToken } from 'next-auth/adapters'
import { UserNutrition } from '@/client/directus/interfaces/UserNutrition'
import { UserNutritionAggregated } from '@/client/directus/interfaces/UserNutritionAggregated'
import { Account } from '@/client/directus/interfaces/Account'

export interface DirectusSchema {
    ns_users: UserRaw[]
    ns_accounts: Account[]
    ns_sessions: Session[]
    ns_user_nutritions: UserNutrition[]
    ns_user_nutrition_aggregated: UserNutritionAggregated[]
    ns_verification_tokens: VerificationToken[]
    products: Product[]
    products_prices: ProductPrice[]
    products_super: ProductSuper[]
    products_brands: ProductBrand[]
    products_stores: ProductStore[]
    products_categories: ProductCategory[]
    products_nutrition: NutritionRecord[]
    products_store_data: ProductStoreData[]
}
