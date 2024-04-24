import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import type { NextAuthConfig } from 'next-auth'
import DirectusAdapter from '@/client/auth/DirectusAdapter'

export const config = {
    theme: {
        logo: '',
        colorScheme: 'dark',
    },
    basePath: '/auth',
    providers: [GoogleProvider],
    callbacks: {
        session({ session, user }) {
            session.user.id = user.id
            return session
        },
    },
    adapter: DirectusAdapter(),
    session: {
        strategy: 'database',
    },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
