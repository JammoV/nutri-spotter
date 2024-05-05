import type { FC } from 'react'
import { auth } from 'auth'
import Image from 'next/image'
import Link from 'next/link'

export interface UserIconProps {
    imgSrc: string
}

const UserIcon: FC<UserIconProps> = async ({ imgSrc }) => {
    return (
        <Link href={'/dashboard'} className="cursor-pointer">
            <Image
                src={imgSrc}
                alt={''}
                quality={100}
                width={80}
                height={80}
                className="rounded-full"
            />
        </Link>
    )
}

export default UserIcon
