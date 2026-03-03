// hooks/useNewsSources.ts
import { useState, useEffect } from 'react'
import { fetchProxySources } from '../api/proxy.api'

export interface NewsApiSource {
    id: string
    name: string
    description?: string
    url?: string
}

export const useNewsSources = () => {
    const [sources, setSources] = useState<NewsApiSource[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()

        const loadSources = async () => {
            try {
                setLoading(true)
                
                const data = await fetchProxySources(controller.signal)
                setSources(data)
                setError(null)
            } catch (err: unknown) {
                if (err instanceof Error && err.name === 'AbortError') return

                const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
                console.error(errorMessage)
                setError(errorMessage)
            } finally {
                setLoading(false)
            }
        }

        loadSources()

        return () => controller.abort()
    }, [])

    return { sources, loading, error }
}