export const GetUserByEmailQuery = `
    query($email: String!) {
        ns_users(filter: {email: {_eq: $email}}) {
            id
            email
            emailVerified
            name
            image
        }
    }
`

export interface GetUserByEmailQueryResponse {
    ns_users: {
        id: string
        email: string
        emailVerified: Date | null
        name: string | null
        image: string | null
    }[]
}
