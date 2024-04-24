import client from '@/client/directus/Client'
import {
    AdapterAccount,
    AdapterSession,
    AdapterUser,
    VerificationToken,
} from 'next-auth/adapters'
import {
    CreateUserMutation,
    CreateUserMutationResponse,
} from '@/client/directus/mutations/CreateUserMutation'
import {
    GetUserQuery,
    GetUserQueryResponse,
} from '@/client/directus/queries/GetUserQuery'
import {
    GetAccountQuery,
    GetAccountQueryResponse,
} from '@/client/directus/queries/GetAccountQuery'
import {
    UpdateUserMutation,
    UpdateUserMutationResponse,
} from '@/client/directus/mutations/UpdateUserMutation'
import {
    CreateAccountMutation,
    CreateAccountMutationResponse,
} from '@/client/directus/mutations/CreateAccountMutation'
import {
    CreateSessionMutation,
    CreateSessionMutationResponse,
} from '@/client/directus/mutations/CreateSessionMutation'
import {
    GetSessionQuery,
    GetSessionQueryResponse,
} from '@/client/directus/queries/GetSessionQuery'
import {
    GetUserByEmailQuery,
    GetUserByEmailQueryResponse,
} from '@/client/directus/queries/GetUserByEmailQuery'
import {
    UpdateSessionMutation,
    UpdateSessionMutationResponse,
} from '@/client/directus/mutations/UpdateSessionMutation'
import {
    DeleteSessionMutation,
    DeleteSessionMutationResponse,
} from '@/client/directus/mutations/DeleteSessionMutation'
import {
    CreateVerificationTokenMutation,
    CreateVerificationTokenMutationResponse,
} from '@/client/directus/mutations/CreateVerificationTokenMutation'

export const createUser = async (user: AdapterUser): Promise<AdapterUser> => {
    const directusUser = await client.query<CreateUserMutationResponse>(
        CreateUserMutation,
        {
            ...user,
        }
    )

    return directusUser.create_ns_users_item
}

export const getUser = async (id: string): Promise<AdapterUser | null> => {
    const directusUser = await client.query<GetUserQueryResponse>(
        GetUserQuery,
        { id: id }
    )

    if (!directusUser.ns_users_by_id) {
        return null
    }

    return directusUser.ns_users_by_id
}

export const getUserByEmail = async (
    email: string
): Promise<AdapterUser | null> => {
    const directusUsers = await client.query<GetUserByEmailQueryResponse>(
        GetUserByEmailQuery,
        { email: email }
    )

    if (!directusUsers.ns_users || directusUsers.ns_users.length !== 1) {
        return null
    }

    return directusUsers.ns_users.shift() || null
}

export const getUserByAccountId = async (
    providerAccountId: string
): Promise<AdapterUser | null> => {
    const directusAccounts = await client.query<GetAccountQueryResponse>(
        GetAccountQuery,
        { providerAccountId: providerAccountId }
    )

    if (
        !directusAccounts.ns_accounts ||
        directusAccounts.ns_accounts.length !== 1
    ) {
        return null
    }

    const directusAccount = directusAccounts.ns_accounts.shift()

    return directusAccount ? getUser(directusAccount.userId) : null
}

export const updateUser = async (
    user: Partial<AdapterUser> & Pick<AdapterUser, 'id'>
): Promise<AdapterUser> => {
    const updatedUser = await client.query<UpdateUserMutationResponse>(
        UpdateUserMutation,
        {
            ...user,
        }
    )

    if (updatedUser.update_ns_users_item) {
        return updatedUser.update_ns_users_item
    }

    // Could not update
    return {
        id: user.id,
        email: user.email || '',
        emailVerified: user.emailVerified || null,
    }
}

export const createAccount = async (
    account: AdapterAccount
): Promise<AdapterAccount | null> => {
    const directusAccounts = await client.query<CreateAccountMutationResponse>(
        CreateAccountMutation,
        {
            ...account,
        }
    )

    return directusAccounts.create_ns_accounts_item
}

export const createSession = async (
    session: AdapterSession
): Promise<AdapterSession> => {
    const directusSession = await client.query<CreateSessionMutationResponse>(
        CreateSessionMutation,
        {
            ...session,
        }
    )

    if (directusSession.create_ns_sessions_item) {
        return {
            userId: directusSession.create_ns_sessions_item.userId,
            sessionToken: directusSession.create_ns_sessions_item.sessionToken,
            expires: new Date(directusSession.create_ns_sessions_item.expires),
        }
    }

    // Could not create
    return {
        sessionToken: '',
        userId: '',
        expires: new Date(),
    }
}

export const getSession = async (
    sessionToken: string
): Promise<AdapterSession | null> => {
    const directusSessions = await client.query<GetSessionQueryResponse>(
        GetSessionQuery,
        { sessionToken: sessionToken }
    )

    if (
        !directusSessions.ns_sessions ||
        directusSessions.ns_sessions.length !== 1
    ) {
        return null
    }

    const directusSession = directusSessions.ns_sessions.shift()

    if (!directusSession) return null

    return {
        userId: directusSession.userId,
        sessionToken: directusSession.sessionToken,
        expires: new Date(directusSession.expires),
    }
}

export const getSessionAndUser = async (
    sessionToken: string
): Promise<{ session: AdapterSession; user: AdapterUser } | null> => {
    const directusSession = await getSession(sessionToken)

    if (!directusSession) return null

    const directusUser = await getUser(directusSession.userId)

    if (!directusUser) return null

    return {
        session: directusSession,
        user: directusUser,
    }
}

export const updateSession = async (
    session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>
): Promise<AdapterSession | null> => {
    const updatedSession = await client.query<UpdateSessionMutationResponse>(
        UpdateSessionMutation,
        {
            ...session,
        }
    )

    return updatedSession.update_ns_sessions_item || null
}

export const deleteSession = async (sessionToken: string): Promise<null> => {
    const updatedSession = await client.query<DeleteSessionMutationResponse>(
        DeleteSessionMutation,
        {
            sessionToken: sessionToken,
        }
    )

    if (!updatedSession.delete_ns_sessions_item?.id) {
        // could not delete
    }

    return null
}

export const createVerificationToken = async (
    verificationToken: VerificationToken
): Promise<VerificationToken | null> => {
    const directusVerificationToken =
        await client.query<CreateVerificationTokenMutationResponse>(
            CreateVerificationTokenMutation,
            {
                ...verificationToken,
            }
        )

    if (directusVerificationToken.create_ns_verification_tokens_item) {
        return directusVerificationToken.create_ns_verification_tokens_item
    }

    // Could not create
    return null
}
