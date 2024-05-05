import { Store } from '@/client/directus/interfaces/Store'
import { ProductPrice } from '@/client/directus/interfaces/Product'

export interface ProductStoreData {
    id: string
    url: string | null
    stores?: Store[] | null
    prices?: ProductPrice[] | null
}
