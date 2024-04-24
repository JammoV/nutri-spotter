export const CreateAccountMutation = `
    mutation ($userId: String!, $provider: String!, $providerAccountId: String!, $type: String! ) {
        create_ns_accounts_item(data: {userId: $userId, provider: $provider, providerAccountId: $providerAccountId, type: $type}) {
            userId
            provider
            providerAccountId
            type
        }
    }
`

export interface CreateAccountMutationResponse {
    create_ns_accounts_item: {
        userId: string
        provider: string
        providerAccountId: string
        type: 'oauth' | 'oidc' | 'email' | 'webauthn'
    }
}
