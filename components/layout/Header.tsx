import type { FC } from 'react'
import UserIcon from '@/components/layout/UserIcon'

const Header: FC = () => {
    return (
        <div className="flex flex-row py-4 items-center justify-between">
            <h1 className="text-3xl font-bold">NutriSpotter</h1>
            <UserIcon />
        </div>
    )
}

export default Header
