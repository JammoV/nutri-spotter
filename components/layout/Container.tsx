import type { FC, ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode
    classNames?: string
    dark?: boolean
    onClick?: () => void
}

const Container: FC<ContainerProps> = ({
    children,
    classNames = '',
    dark = false,
    onClick,
}) => {
    return (
        <div
            className={`${classNames} ${dark ? 'bg-black' : 'bg-container'} rounded-lg p-4`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default Container
