import type { FC, ReactNode } from 'react'

interface ButtonProps {
    children: ReactNode
    classNames?: string
    isPrimary?: boolean
    onClick?: () => void
    small?: boolean
}

const Button: FC<ButtonProps> = ({
    children,
    classNames = '',
    isPrimary = true,
    small = false,
    onClick,
}) => {
    return (
        <button
            className={`bg-primary ${small ? 'py-1 px-2' : 'py-2 px-4'} rounded cursor-pointer border-none w-full text-center ${classNames}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
