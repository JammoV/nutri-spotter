import type { FC } from 'react'
import { auth } from 'auth'
import Image from 'next/image'
import Link from 'next/link'

const UserIcon: FC = async () => {
    const session = await auth()

    if (!session?.user) return <></>

    return (
        <Link href={'/dashboard'} className="cursor-pointer">
            {session.user.image && (
                <Image
                    src={session.user.image}
                    alt={session.user.name || ''}
                    quality={100}
                    width={60}
                    height={60}
                    className="rounded-full"
                />
            )}
        </Link>
    )
}

export default UserIcon
