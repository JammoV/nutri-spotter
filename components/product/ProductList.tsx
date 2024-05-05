'use client'

import type { FC } from 'react'
import { Product } from '@/client/directus/interfaces/Product'
import { useEffect, useState } from 'react'
import { getProducts } from '@/client/directus/NutriAPI'
import useDebounce from '@/lib/hooks/useDebounce'
import ProductListItem from '@/components/product/ProductListItem'

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
                    className="w-full border rounded p-2 mb-4 text-white bg-transparent"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search product by name..."
                    autoFocus
                />
            </div>
            <div className="flex flex-col gap-4">
                {searchProducts.map((product) => (
                    <ProductListItem key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default ProductList
