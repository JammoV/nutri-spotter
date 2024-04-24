export const CreateVerificationTokenMutation = `
    mutation ($identifier: ID!, $token: String!, $expires: Date!) {
        create_ns_verification_tokens_item(data: {identifier: $identifier, token: $token, expires: $expires}) {
            identifier
            token
            expires
        }
    }
`

export interface CreateVerificationTokenMutationResponse {
    create_ns_verification_tokens_item: {
        identifier: string
        token: string
        expires: Date
    }
}
