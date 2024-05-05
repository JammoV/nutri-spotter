import type { FC, ReactNode } from 'react'

interface HeadingProps {
    children: ReactNode
}

const Heading: FC<HeadingProps> = ({ children }) => {
    return <h2 className="text-xl font-semibold mb-4">{children}</h2>
}

export default Heading
