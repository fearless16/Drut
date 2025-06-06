import React, { createContext, useContext, useState } from 'react'
import type { HeaderItem } from '@/components/RequestBuilder/HeaderEditor'
import type { HTTP_METHODS } from '@/constants/http'

export interface RequestPreset {
  method: HTTP_METHODS
  url: string
  headers: HeaderItem[]
  body: string
}

interface RequestFormContextType {
  preset: RequestPreset | null
  setPreset: (preset: RequestPreset | null) => void
}

export const RequestFormContext = createContext<RequestFormContextType | undefined>(
  undefined
)

export const RequestFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [preset, setPreset] = useState<RequestPreset | null>(null)

  return (
    <RequestFormContext.Provider value={{ preset, setPreset }}>
      {children}
    </RequestFormContext.Provider>
  )
}

export const useRequestFormContext = () => {
  const ctx = useContext(RequestFormContext)
  if (!ctx)
    throw new Error(
      'useRequestFormContext must be used inside RequestFormProvider'
    )
  return ctx
}
