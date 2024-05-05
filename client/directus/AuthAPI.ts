import client from '@/client/directus/Client'
import {
    AdapterSession,
    AdapterUser,
    VerificationToken,
} from 'next-auth/adapters'
import {
    createItem,
    deleteItem,
    readItem,
    readItems,
    updateItem,
} from '@directus/sdk'
import { Account } from '@/client/directus/interfaces/Account'

export const createUser = async (user: AdapterUser): Promise<AdapterUser> => {
    return await client.request(createItem('ns_users', user))
}

export const getUser = async (id: string): Promise<AdapterUser | null> => {
    return await client.request(readItem('ns_users', id))
}

export const getUserByEmail = async (
    email: string
): Promise<AdapterUser | null> => {
    const users = await client.request(
        readItems('ns_users', {
            filter: {
                email: {
                    _eq: email,
                },
            },
        })
    )

    if (!users || users.length !== 1) {
        return null
    }

    return users.shift() || null
}

export const getUserByAccountId = async (
    providerAccountId: string
): Promise<AdapterUser | null> => {
    const accounts = await client.request(
        readItems('ns_accounts', {
            filter: {
                providerAccountId: {
                    _eq: providerAccountId,
                },
            },
        })
    )

    if (!accounts || accounts.length !== 1) {
        return null
    }

    const account = accounts.shift()

    return account?.userId ? getUser(account.userId as string) : null
}

export const updateUser = async (
    user: Partial<AdapterUser> & Pick<AdapterUser, 'id'>
): Promise<AdapterUser> => {
    const updatedUser = await client.request(
        updateItem('ns_users', user.id, { ...user })
    )

    if (updatedUser) {
        return updatedUser
    }

    // Could not update
    return {
        id: user.id,
        email: user.email || '',
        emailVerified: user.emailVerified || null,
    }
}

export const createAccount = async (
    account: Account
): Promise<Account | null> => {
    const result = await client.request(createItem('ns_accounts', account))

    if (result.length === 1) {
        return result[0] as Account
    }

    return null
}

export const createSession = async (
    session: AdapterSession
): Promise<AdapterSession> => {
    const directusSession = await client.request(
        createItem('ns_sessions', session)
    )

    if (directusSession) {
        return {
            userId: directusSession.userId,
            sessionToken: directusSession.sessionToken,
            expires: new Date(directusSession.expires),
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
    const sessions = await client.request(
        readItems('ns_sessions', {
            filter: {
                sessionToken: {
                    _eq: sessionToken,
                },
            },
        })
    )

    if (!sessions || sessions.length !== 1) {
        return null
    }

    const directusSession = sessions.shift()

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
    return await client.request(
        updateItem('ns_sessions', session.sessionToken, { ...session })
    )
}

export const deleteSession = async (sessionToken: string): Promise<void> => {
    return await client.request(deleteItem('ns_sessions', sessionToken))
}

export const createVerificationToken = async (
    verificationToken: VerificationToken
): Promise<VerificationToken | null> => {
    return await client.request(
        createItem('ns_verification_tokens', verificationToken)
    )
}
