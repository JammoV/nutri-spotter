import { Product } from '@/client/directus/interfaces/Product'

export const GetProductsQuery = `
    query($limit: Int!, $searchTerm: String) {
        products(limit: $limit, search: $searchTerm) {
            id
            name
            stores {
                id
                url
                store {
                    id
                    name
                }
                prices {
                    id
                    price
                }
            }
            brand {
                id
                name
            }
            portionSize
            weight
            unit
        }
    }
`

export interface GetProductsQueryResponse {
    products: Product[] | null
}
