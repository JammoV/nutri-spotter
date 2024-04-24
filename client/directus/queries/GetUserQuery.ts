import { User } from '@/client/directus/interfaces/User'

export const GetUserQuery = `
    query($id: ID!) {
        ns_users_by_id(id: $id) {
            id
            email
            emailVerified
            name
            image
            target_energy
            target_fat
            target_saturated_fat
            target_unsaturated_fat
            target_carbs
            target_sugar
            target_fibres
            target_protein
            target_salt
        }
    }
`

export interface GetUserQueryResponse {
    ns_users_by_id: User | null
}
