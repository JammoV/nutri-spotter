'use client'

import type { FC } from 'react'
import { Product } from '@/client/directus/interfaces/Product'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getProducts } from '@/client/directus/NutriAPI'
import useDebounce from '@/lib/hooks/useDebounce'

interface ProductListProps {
    products: Product[]
}

const ProductList: FC<ProductListProps> = ({ products }) => {
    const [searchProducts, setSearchProducts] = useState<Product[]>(products)

    const { debouncedValue: debouncedSearchTerm, setValue: setSearchTerm } =
        useDebounce<string>(500, '')

    useEffect(() => {
        const searchProducts = async () => {
            const searchResult = await getProducts(20, debouncedSearchTerm)
            setSearchProducts(searchResult ?? products)
        }

        if (!debouncedSearchTerm) {
            setSearchProducts(products)
        }

        searchProducts().catch((e) => {
            console.warn(e)
        })
    }, [debouncedSearchTerm, products])

    return (
        <div>
            <div>
                <input
                    type="text"
                    className="w-full border p-2 my-2"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Zoek op product naam..."
                />
            </div>
            <div className="flex flex-col gap-4">
                {searchProducts.map((product) => {
                    return (
                        <div key={product.id} className="border p-2">
                            <Link href={`/product/${product.id}`}>
                                {product.name} ({product.brand?.name})
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductList
