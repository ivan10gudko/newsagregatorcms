import { NewsApiSource } from "../hooks/useNewsSource"

export const fetchProxySources = async (signal?: AbortSignal): Promise<NewsApiSource[]> => {
    const baseUrl = process.env.SANITY_STUDIO_PROXY_URL

    if (!baseUrl) {
        throw new Error('SANITY_STUDIO_PROXY_URL is not defined')
    }

    const res = await fetch(`${baseUrl}/sources`, { signal })

    if (!res.ok) {
        throw new Error(`Failed to fetch sources: ${res.statusText}`)
    }

    const data = await res.json()
    return data.sources || []
}