import {
    getAggregatedUserNutrition,
    getProducts,
} from '@/client/directus/NutriAPI'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import ProductList from '@/components/product/ProductList'
import NutritionTable from '@/components/product/NutritionTable'
import { User } from '@/client/directus/interfaces/User'

export default async function Page() {
    const session = await auth()

    if (!session?.user) {
        redirect('/')
    }

    const user = session.user as User

    const products = await getProducts(20)
    const aggregatedUserNutrition = await getAggregatedUserNutrition(
        user.id || ''
    )

    if (!products) return <>No products found</>

    return (
        <div className="flex flex-col gap-4">
            <ProductList products={products} />
            {aggregatedUserNutrition && (
                <NutritionTable
                    columnLeftTitle="Vandaag"
                    columnRightTitle="Target"
                    columnLeft={aggregatedUserNutrition}
                    columnRight={{
                        energy: user.target_energy,
                        fat: user.target_fat,
                        saturated_fat: user.target_saturated_fat,
                        unsaturated_fat: user.target_unsaturated_fat,
                        carbs: user.target_carbs,
                        sugar: user.target_sugar,
                        fibres: user.target_fibres,
                        protein: user.target_protein,
                        salt: user.target_salt,
                    }}
                    withPercentage={true}
                />
            )}
        </div>
    )
}
