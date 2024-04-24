import { Store } from '@/client/directus/interfaces/Store'
import { ProductPrice } from '@/client/directus/interfaces/ProductPrice'

export interface ProductStoreData {
    id: string
    url: string | null
    stores: Store[]
    prices: ProductPrice[]
}
