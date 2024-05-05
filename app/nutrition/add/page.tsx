import { getProducts } from '@/client/directus/NutriAPI'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import ProductList from '@/components/product/ProductList'
import { SessionProvider } from 'next-auth/react'

export default async function Page() {
    const session = await auth()

    if (!session?.user) {
        redirect('/')
    }

    const products = await getProducts(20)

    return (
        <SessionProvider basePath={'/auth'} session={session}>
            <div className="flex flex-col gap-8">
                {products && <ProductList products={products} />}
            </div>
        </SessionProvider>
    )
}
