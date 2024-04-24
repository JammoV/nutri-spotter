import { Product } from '@/client/directus/interfaces/Product'

export const GetProductQuery = `
    query($id: ID!) {
        products_by_id(id: $id) {
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
            nutrition {
                id
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
    }
`

export interface GetProductQueryResponse {
    products_by_id: Product | null
}
