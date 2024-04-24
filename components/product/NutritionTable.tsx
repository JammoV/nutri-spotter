import type { FC } from 'react'
import { NutritionData } from '@/client/directus/interfaces/NutritionData'

interface NutritionTableProps {
    columnLeftTitle: string
    columnRightTitle: string
    columnLeft: NutritionData
    columnRight: NutritionData
    withPercentage?: boolean
}

const calculatePercentage = (
    partialValue: number,
    totalValue: number
): string => {
    return ((partialValue / totalValue) * 100).toFixed(2)
}

const NutritionTable: FC<NutritionTableProps> = ({
    columnLeftTitle,
    columnRightTitle,
    columnLeft,
    columnRight,
    withPercentage = false,
}) => {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th className="border border-slate-600 text-left p-1">
                        Voedingswaarde
                    </th>
                    <th className="border border-slate-600 text-right p-1">
                        {columnLeftTitle}
                    </th>
                    <th className="border border-slate-600 text-right p-1">
                        {columnRightTitle}
                    </th>
                    {withPercentage && (
                        <th className="border border-slate-600 text-right p-1">
                            %
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-slate-700 p-1">Energie</td>
                    <td className="border border-slate-700 text-right p-1">
                        {columnLeft.energy} kcal
                    </td>
                    <td className="border border-slate-700 text-right p-1">
                        {columnRight.energy} kcal
                    </td>
                    {withPercentage && (
                        <td className="border border-slate-700 text-right p-1">
                            {calculatePercentage(
                                columnLeft.energy,
                                columnRight.energy
                            )}
                        </td>
                    )}
                </tr>
                <tr>
                    <td className="border border-slate-700 p-1">
                        <span>Vetten</span>
                        {columnLeft.saturated_fat > 0 && (
                            <span className="block pl-4">
                                waarvan verzadigde vetzuren
                            </span>
                        )}
                        {columnLeft.unsaturated_fat > 0 && (
                            <span className="block pl-4">
                                waarvan onverzadigde vetzuren
                            </span>
                        )}
                    </td>
                    <td className="border border-slate-700 text-right p-1">
                        <span>{columnLeft.fat} g</span>
                        {columnLeft.saturated_fat > 0 && (
                            <span className="block">
                                {columnLeft.saturated_fat} g
                            </span>
                        )}
                        {columnLeft.unsaturated_fat > 0 && (
                            <span className="block">
                                {columnLeft.unsaturated_fat} g
                            </span>
                        )}
                    </td>
                    <td className="border border-slate-700 text-right p-1">
                        <span>{columnRight.fat} g</span>
                        {columnLeft.saturated_fat > 0 && (
                            <span className="block">
                                {columnRight.saturated_fat} g
                            </span>
                        )}
                        {columnLeft.unsaturated_fat > 0 && (
                            <span className="block">
                                {columnRight.unsaturated_fat} g
                            </span>
                        )}
                    </td>
                    {withPercentage && (
                        <td className="border border-slate-700 text-right p-1">
                            <span>
                                {calculatePercentage(
                                    columnLeft.fat,
                                    columnRight.fat
                                )}
                            </span>
                            {columnLeft.saturated_fat > 0 &&
                                columnRight.saturated_fat > 0 && (
                                    <span className="block">
                                        {calculatePercentage(
                                            columnLeft.saturated_fat,
                                            columnRight.saturated_fat
                                        )}
                                    </span>
                                )}
                            {columnLeft.unsaturated_fat > 0 &&
                                columnRight.unsaturated_fat > 0 && (
                                    <span className="block">
                                        {calculatePercentage(
                                            columnLeft.unsaturated_fat,
                                            columnRight.unsaturated_fat
                                        )}
                                    </span>
                                )}
                        </td>
                    )}
                </tr>
                <tr>
                    <td className="border border-slate-700 p-1">
                        Koolhydraten
                    </td>
                    <td className="border border-slate-700 text-right p-1">
                        {columnLeft.carbs} g
                    </td>
                    <td className="border border-slate-700 text-right p-1">
                        {columnRight.carbs} g
                    </td>
                    {withPercentage && (
                        <td className="border border-slate-700 text-right p-1">
                            {calculatePercentage(
                                columnLeft.carbs,
                                columnRight.carbs
                            )}
                        </td>
                    )}
                </tr>
                <tr>
                    <td className="border border-slate-700 p-1">Suikers</td>
                    <td className="border border-slate-700 text-right p-1">
                        {columnLeft.sugar} g
                    </td>
                    <td className="border border-slate-700 text-right p-1">
                        {columnRight.sugar} g
                    </td>
                    {withPercentage && (
                        <td className="border border-slate-700 text-right p-1">
                            {calculatePercentage(
                                columnLeft.sugar,
                                columnRight.sugar
                            )}
                        </td>
                    )}
                </tr>
                <tr>
                    <td className="border border-slate-700 p-1">Vezels</td>
                    <td className="border border-slate-700 text-right p-1">
                        {columnLeft.fibres} g
                    </td>
                    <td className="border border-slate-700 text-right p-1">
                        {columnRight.fibres} g
                    </td>
                    {withPercentage && (
                        <td className="border border-slate-700 text-right p-1">
                            {calculatePercentage(
                                columnLeft.fibres,
                                columnRight.fibres
                            )}
                        </td>
                    )}
                </tr>
                <tr>
                    <td className="border border-slate-700 p-1">Eiwitten</td>
                    <td className="border border-slate-700 text-right p-1">
                        {columnLeft.protein} g
                    </td>
                    <td className="border border-slate-700 text-right p-1">
                        {columnRight.protein} g
                    </td>
                    {withPercentage && (
                        <td className="border border-slate-700 text-right p-1">
                            {calculatePercentage(
                                columnLeft.protein,
                                columnRight.protein
                            )}
                        </td>
                    )}
                </tr>
                <tr>
                    <td className="border border-slate-700 p-1">Zout</td>
                    <td className="border border-slate-700 text-right p-1">
                        {columnLeft.salt} g
                    </td>
                    <td className="border border-slate-700 text-right p-1">
                        {columnRight.salt} g
                    </td>
                    {withPercentage && (
                        <td className="border border-slate-700 text-right p-1">
                            {calculatePercentage(
                                columnLeft.salt,
                                columnRight.salt
                            )}
                        </td>
                    )}
                </tr>
            </tbody>
        </table>
    )
}

export default NutritionTable
