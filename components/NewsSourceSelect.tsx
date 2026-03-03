import React from 'react'
import {ObjectInputProps, set, unset} from 'sanity'
import {Card, Select, Spinner, Stack, Text} from '@sanity/ui'
import {useNewsSources} from '../hooks/useNewsSource'

interface SourceData {
  id?: string
  name?: string
}

export const NewsSourceSelect = (props: ObjectInputProps<SourceData>) => {
  const {value, onChange} = props

  const {sources, loading, error} = useNewsSources()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.currentTarget.value

    if (!selectedId) {
      onChange(unset())
      return
    }

    const selectedSource = sources.find((s) => s.id === selectedId)

    if (selectedSource) {
      onChange(
        set({
          id: selectedSource.id,
          name: selectedSource.name,
        }),
      )
    }
  }

  if (loading) {
    return (
      <Stack space={3} padding={2}>
        <Spinner />
        <Text size={1} muted>
          Loading sources from proxy...
        </Text>
      </Stack>
    )
  }

  if (error) {
    return (
      <Card padding={3} radius={2} tone="critical">
        <Text size={1}>Proxy Error: {error}</Text>
      </Card>
    )
  }

  return (
    <Stack space={3}>
      <Select value={value?.id || ''} onChange={handleChange}>
        <option value="">--- Select a News Source ---</option>
        {sources.map((source) => (
          <option key={source.id} value={source.id}>
            {source.name}
          </option>
        ))}
      </Select>

      {value?.name && (
        <Text size={1} muted>
          Saved: {value.name} ({value.id})
        </Text>
      )}
    </Stack>
  )
}
