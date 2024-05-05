import type { FC } from 'react'
import { Nutrition } from '@/client/directus/interfaces/Nutrition'
import { formatNumber } from '@/lib/functions'

interface NutritionTableProps {
    columnLeftTitle: string
    columnRightTitle: string
    columnLeft: Nutrition
    columnRight: Nutrition
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
                    <td className="border border-slate-700 p-1">Energy</td>
                    <td className="border border-slate-700 text-right p-1">
                        {formatNumber(columnLeft.energy)} kcal
                    </td>
                    <td className="border border-slate-700 text-right p-1">
                        {formatNumber(columnRight.energy)} kcal
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
                        <span>Fat</span>
                        {columnLeft.saturated_fat > 0 && (
                            <span className="block pl-4">saturated fat</span>
                        )}
                        {columnLeft.unsaturated_fat > 0 && (
                            <span className="block pl-4">unsaturated fat</span>
                        )}
                    </td>
                    <td className="border border-slate-700 text-right p-1">
                        <span>{formatNumber(columnLeft.fat)} g</span>
                        {columnLeft.saturated_fat > 0 && (
                            <span className="block">
                                {formatNumber(columnLeft.saturated_fat)} g
                            </span>
                        )}
                        {columnLeft.unsaturated_fat > 0 && (
                            <span className="block">
                                {formatNumber(columnLeft.unsaturated_fat)} g
                            </span>
                        )}
                    </td>
                    <td className="border border-slate-700 text-right p-1">
                        <span>{formatNumber(columnRight.fat)} g</span>
                        {columnLeft.saturated_fat > 0 && (
                            <span className="block">
                                {formatNumber(columnRight.saturated_fat)} g
                            </span>
                        )}
                        {columnLeft.unsaturated_fat > 0 && (
                            <span className="block">
                                {formatNumber(columnRight.unsaturated_fat)} g
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
                    <td className="border border-slate-700 p-1">Carbs</td>
                    <td className="border border-slate-700 text-right p-1">
                        {formatNumber(columnLeft.carbs)} g
                    </td>
                    <td className="border border-slate-700 text-right p-1">
                        {formatNumber(columnRight.carbs)} g
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
                    <td className="border border-slate-700 p-1">Sugar</td>
                    <td className="border border-slate-700 text-right p-1">
                        {formatNumber(columnLeft.sugar)} g
                    </td>
                    <td className="border border-slate-700 text-right p-1">
                        {formatNumber(columnRight.sugar)} g
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
                    <td className="border border-slate-700 p-1">Fibres</td>
                    <td className="border border-slate-700 text-right p-1">
                        {formatNumber(columnLeft.fibres)} g
                    </td>
                    <td className="border border-slate-700 text-right p-1">
                        {formatNumber(columnRight.fibres)} g
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
                    <td className="border border-slate-700 p-1">Protein</td>
                    <td className="border border-slate-700 text-right p-1">
                        {formatNumber(columnLeft.protein)} g
                    </td>
                    <td className="border border-slate-700 text-right p-1">
                        {formatNumber(columnRight.protein)} g
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
                    <td className="border border-slate-700 p-1">Salt</td>
                    <td className="border border-slate-700 text-right p-1">
                        {formatNumber(columnLeft.salt)} g
                    </td>
                    <td className="border border-slate-700 text-right p-1">
                        {formatNumber(columnRight.salt)} g
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
