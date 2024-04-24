export const DeleteVerificationTokenMutation = `
    mutation ($identifier: ID!) {
        delete_ns_verification_tokens_item(id: $identifier) {
            id
        }
    }
`

export interface DeleteVerificationTokenMutationResponse {
    delete_ns_verification_tokens_item: {
        id: string
    } | null
}
