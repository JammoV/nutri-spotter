export const CreateUserMutation = `
    mutation($id: ID!, $email: String!, $emailVerified: Date, $name: String, $image: String) {
        create_ns_users_item(data: {id: $id, email: $email, emailVerified: $emailVerified, name: $name, image: $image}) {
            id
            email
            emailVerified
            name
            image
        }
    }
`

export interface CreateUserMutationResponse {
    create_ns_users_item: {
        id: string
        email: string
        emailVerified: Date | null
        name: string | null
        image: string | null
    }
}
