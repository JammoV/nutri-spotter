export const UpdateSessionMutation = `
    mutation ($sessionToken: ID!, $userId: String!, $expires: Date!) {
        update_ns_sessions_item(id: $sessionToken, data: {userId: $userId, expires: $expires}) {
            userId
            sessionToken
            expires
        }
    }
`

export interface UpdateSessionMutationResponse {
    update_ns_sessions_item: {
        sessionToken: string
        userId: string
        expires: Date
    } | null
}
