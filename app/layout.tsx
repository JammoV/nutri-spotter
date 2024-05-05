import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import React from 'react'
import Header from '@/components/layout/Header'

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500'],
    display: 'swap',
    variable: '--font-roboto',
})

export const metadata: Metadata = {
    title: '',
    description: '',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="nl">
            <body className={`${roboto.variable} bg-black text-white mb-8`}>
                <div className="container max-w-2xl mx-auto p-4 sm:p-0">
                    <Header />
                    <main className="flex-grow">{children}</main>
                </div>
            </body>
        </html>
    )
}
