import React, { createContext, useContext, useEffect, useState } from 'react'
import * as localforage from 'localforage'
import { v4 as uuid } from 'uuid'
import type { HeaderItem } from '@/components/RequestBuilder/HeaderEditor'
import type { HTTP_METHODS } from '@/constants/http'

export interface HistoryRecord {
  id: string
  method: HTTP_METHODS
  url: string
  headers: HeaderItem[]
  body: string
  timestamp: number
}

interface HistoryContextType {
  history: HistoryRecord[]
  addRequest: (record: Omit<HistoryRecord, 'id' | 'timestamp'>) => Promise<void>
  clearHistory: () => void
}

export const HistoryContext = createContext<HistoryContextType | undefined>(
  undefined
)

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [history, setHistory] = useState<HistoryRecord[]>([])

  useEffect(() => {
      const fetchHistory = async () => {
        try {
          const stored = await localforage.getItem<HistoryRecord[]>('history')
          if (stored) setHistory(stored)
        } catch (err) {
          setHistory([]) // fallback
        }
      }

      fetchHistory()
    }, [])

  const addRequest = async (
    record: Omit<HistoryRecord, 'id' | 'timestamp'>
  ) => {
    const newRecord: HistoryRecord = {
      ...record,
      id: uuid(),
      timestamp: Date.now(),
    }

    const updated = [newRecord, ...history]
    setHistory(updated)
    await localforage.setItem('history', updated)
  }

  const clearHistory = async () => {
    setHistory([])
    await localforage.removeItem('history')
  }

  return (
    <HistoryContext.Provider value={{ history, addRequest, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  )
}

export const useHistoryContext = () => {
  const ctx = useContext(HistoryContext)
  if (!ctx)
    throw new Error('useHistoryContext must be used within HistoryProvider')
  return ctx
}
