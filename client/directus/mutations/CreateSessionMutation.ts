export const CreateSessionMutation = `
    mutation ($sessionToken: ID!, $userId: String!, $expires: Date!) {
        create_ns_sessions_item(data: {userId: $userId, sessionToken: $sessionToken, expires: $expires}) {
            userId
            sessionToken
            expires
        }
    }
`

export interface CreateSessionMutationResponse {
    create_ns_sessions_item: {
        userId: string
        sessionToken: string
        expires: Date
    }
}
