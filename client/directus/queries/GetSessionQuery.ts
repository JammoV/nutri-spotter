export const GetSessionQuery = `
    query($sessionToken: String!) {
        ns_sessions(filter: {sessionToken: {_eq: $sessionToken}}) {
            userId
            expires
            sessionToken
        }
    }
`

export interface GetSessionQueryResponse {
    ns_sessions: {
        userId: string
        expires: Date
        sessionToken: string
    }[]
}
