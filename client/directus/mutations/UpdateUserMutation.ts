export const UpdateUserMutation = `
    mutation ($id: ID!, $email: String!, $emailVerified: Date, $name: String, $image: String) {
        update_ns_users_item(id: $id, data: {email: $email, emailVerified: $emailVerified, name: $name, image: $image}) {
            id
            email
            emailVerified
            name
            image
        }
    }
`

export interface UpdateUserMutationResponse {
    update_ns_users_item: {
        id: string
        email: string
        emailVerified: Date | null
        name: string | null
        image: string | null
    } | null
}
