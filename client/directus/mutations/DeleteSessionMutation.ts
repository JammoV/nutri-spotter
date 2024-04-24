export const DeleteSessionMutation = `
    mutation ($sessionToken: ID!) {
        delete_ns_sessions_item(id: $sessionToken) {
            id
        }
    }
`

export interface DeleteSessionMutationResponse {
    delete_ns_sessions_item: {
        id: string
    } | null
}
