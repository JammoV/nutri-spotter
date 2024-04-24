import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

function useDebounce<T>(
    delay: number,
    initialValue: T
): {
    debouncedValue: T
    rawValue: T
    setValue: Dispatch<SetStateAction<T>>
    reset: () => void
    debouncing: boolean
}

function useDebounce<T = undefined>(
    delay?: number
): {
    debouncedValue: T | undefined
    rawValue: T | undefined
    setValue: Dispatch<SetStateAction<T | undefined>>
    reset: () => void
    debouncing: boolean
}

function useDebounce<T>(
    delay = 500,
    initialValue?: T
): {
    debouncedValue: T | undefined
    rawValue: T | undefined
    setValue: Dispatch<SetStateAction<T | undefined>>
    reset: () => void
    debouncing: boolean
} {
    const [debouncing, setDebouncing] = useState(false)
    const [rawValue, setValue] = useState<T | undefined>(initialValue)
    const [debouncedValue, setDebouncedValue] = useState<T | undefined>(
        initialValue
    )

    useEffect(() => {
        setDebouncing(true)
        const handler = setTimeout((): void => {
            setDebouncedValue(rawValue)
            setDebouncing(false)
        }, delay)

        return (): void => {
            clearTimeout(handler)
        }
    }, [rawValue, delay])

    const reset = (): void => {
        setValue(initialValue)
        setDebouncedValue(initialValue)
        setDebouncing(false)
    }

    return {
        debouncedValue,
        rawValue,
        setValue,
        reset,
        debouncing,
    }
}

export default useDebounce
