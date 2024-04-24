import type {
    Adapter,
    AdapterAccount,
    AdapterSession,
    AdapterUser,
    VerificationToken,
} from 'next-auth/adapters'
import { Awaitable } from '@auth/core/types'
import {
    createAccount,
    createSession,
    createUser,
    createVerificationToken,
    deleteSession,
    getSessionAndUser,
    getUser,
    getUserByAccountId,
    getUserByEmail,
    updateSession,
    updateUser,
} from '@/client/directus/AuthAPI'

const DirectusAdapter = (): Adapter => {
    return {
        /* User Management */
        createUser(user: AdapterUser): Awaitable<AdapterUser> {
            return createUser(user)
        },
        getUser(id: string): Awaitable<AdapterUser | null> {
            return getUser(id)
        },
        getUserByAccount(
            providerAccountId: Pick<
                AdapterAccount,
                'provider' | 'providerAccountId'
            >
        ): Awaitable<AdapterUser | null> {
            return getUserByAccountId(providerAccountId.providerAccountId)
        },
        updateUser(
            user: Partial<AdapterUser> & Pick<AdapterUser, 'id'>
        ): Awaitable<AdapterUser> {
            return updateUser(user)
        },
        linkAccount(
            account: AdapterAccount
        ): Promise<void> | Awaitable<AdapterAccount | null | undefined> {
            return createAccount(account)
        },
        /* Database session management */
        createSession(session: AdapterSession): Awaitable<AdapterSession> {
            console.log(session)
            return createSession(session)
        },
        getSessionAndUser(
            sessionToken: string
        ): Awaitable<{ session: AdapterSession; user: AdapterUser } | null> {
            return getSessionAndUser(sessionToken)
        },
        updateSession(
            session: Partial<AdapterSession> &
                Pick<AdapterSession, 'sessionToken'>
        ): Awaitable<AdapterSession | null | undefined> {
            return updateSession(session)
        },
        deleteSession(
            sessionToken: string
        ): Promise<void> | Awaitable<AdapterSession | null | undefined> {
            return deleteSession(sessionToken)
        },
        /* Verification tokens */
        getUserByEmail(email: string): Awaitable<AdapterUser | null> {
            return getUserByEmail(email)
        },
        createVerificationToken(
            verificationToken: VerificationToken
        ): Awaitable<VerificationToken | null | undefined> {
            return createVerificationToken(verificationToken)
        },
        useVerificationToken(params: {
            identifier: string
            token: string
        }): Awaitable<VerificationToken | null> {
            return null
        },
    }
}

export default DirectusAdapter
