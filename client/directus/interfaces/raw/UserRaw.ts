import { AdapterUser } from 'next-auth/adapters'

export interface UserRaw extends AdapterUser {
    target_energy?: number
    target_fat?: number
    target_saturated_fat?: number
    target_unsaturated_fat?: number
    target_carbs?: number
    target_sugar?: number
    target_fibres?: number
    target_protein?: number
    target_salt?: number
}
