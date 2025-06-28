import React, { createContext, useContext, useEffect, useState } from 'react'
import * as localforage from 'localforage'
import { v4 as uuid } from 'uuid'
import type { HTTP_METHODS } from '@/constants/http'
import type { HeaderItem } from './RequestFormContext'

export interface HistoryRecord {
  id: string
  method: HTTP_METHODS
  url: string
  headers: HeaderItem[]
  body: string
  timestamp: number
}

interface HistoryContextType {
  deleteRequest(id: string): unknown
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
        setHistory([])
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

    setHistory((prev) => {
      const updated = [newRecord, ...prev]
      localforage.setItem('history', updated)
      return updated
    })
  }

  const clearHistory = async () => {
    setHistory([])
    await localforage.removeItem('history')
  }

  const deleteRequest = async (id: string) => {
    const filtered = history.filter((r) => r.id !== id)
    setHistory(filtered)
    await localforage.setItem('history', filtered)
  }

  return (
    <HistoryContext.Provider
      value={{ history, addRequest, clearHistory, deleteRequest }}
    >
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
