import { getProduct } from '@/client/directus/NutriAPI'
import ProductNutritionTable from '@/components/product/ProductNutritionTable'
import { SessionProvider } from 'next-auth/react'
import { auth } from 'auth'

export default async function Page({ params }: { params: { id: string } }) {
    const session = await auth()
    const product = await getProduct(params.id)

    if (!product) return <>Product not found</>

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-xl">{product.name}</h1>
            {product.brand && <span>Merk: {product.brand.name}</span>}
            <span>
                {product.weight} {product.unit}
            </span>
            <SessionProvider basePath={'/auth'} session={session}>
                {product.nutrition ? (
                    <ProductNutritionTable
                        productNutrition={product.nutrition}
                        portionSize={product.portionSize || 10}
                        productId={product.id}
                    />
                ) : (
                    <span>Geen voedingswaarde beschikbaar</span>
                )}
            </SessionProvider>
        </div>
    )
}
