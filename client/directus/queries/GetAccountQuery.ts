export const GetAccountQuery = `
    query($providerAccountId: String!) {
        ns_accounts(filter: {providerAccountId: {_eq: $providerAccountId}}) {
            id
            userId
            provider
            type
        }
    }
`

export interface GetAccountQueryResponse {
    ns_accounts: {
        id: string
        userId: string
        provider: string
        type: string
    }[]
}
