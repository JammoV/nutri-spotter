import type { FC } from 'react'
import UserIcon from '@/components/layout/UserIcon'
import { auth } from 'auth'

const Header: FC = async () => {
    const session = await auth()

    if (!session?.user) return <></>

    return (
        <div className="flex flex-row my-8 gap-8 items-center">
            {session.user.image && <UserIcon imgSrc={session.user.image} />}
            <div className="flex flex-col">
                <span className="text-xl font-semibold">
                    {session.user.name}
                </span>
                <span className="text-grey">Welcome back!</span>
            </div>
        </div>
    )
}

export default Header
