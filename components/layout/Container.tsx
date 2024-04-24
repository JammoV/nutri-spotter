import type { FC, ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => {
    return <div className="container max-w-2xl mx-auto">{children}</div>
}

export default Container
