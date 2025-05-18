import React, { createContext, useContext, useEffect, useState } from 'react'
import localforage from 'localforage'
import { v4 as uuid } from 'uuid'

export interface EnvVar {
  key: string
  value: string
}

export interface EnvRecord {
  id: string
  name: string
  variables: EnvVar[]
  createdAt: number
}

interface EnvContextType {
  environments: EnvRecord[]
  selectedEnvId: string | null
  addEnv: (name: string, variables: EnvVar[]) => void
  updateEnv: (
    id: string,
    updated: Partial<Omit<EnvRecord, 'id' | 'createdAt'>>
  ) => void
  deleteEnv: (id: string) => void
  selectEnv: (id: string | null) => void
  selectedEnv: EnvRecord | null
}

export const EnvContext = createContext<EnvContextType | undefined>(undefined)

export const EnvProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [environments, setEnvs] = useState<EnvRecord[]>([])
  const [selectedEnvId, setSelectedEnvId] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      const stored = await localforage.getItem<EnvRecord[]>('environments')
      const selected = await localforage.getItem<string | null>('selectedEnvId')
      if (stored) setEnvs(stored)
      if (selected) setSelectedEnvId(selected)
    }
    load()
  }, [])

  const persist = async (envs: EnvRecord[]) => {
    setEnvs(envs)
    await localforage.setItem('environments', envs)
  }

  const addEnv = async (name: string, variables: EnvVar[]) => {
    const newEnv: EnvRecord = {
      id: uuid(),
      name,
      variables,
      createdAt: Date.now(),
    }
    const updated = [newEnv, ...environments]
    await persist(updated)
  }

  const updateEnv = async (
    id: string,
    updatedFields: Partial<Omit<EnvRecord, 'id' | 'createdAt'>>
  ) => {
    const updated = environments.map((e) =>
      e.id === id ? { ...e, ...updatedFields } : e
    )
    await persist(updated)
  }

  const deleteEnv = async (id: string) => {
    const updated = environments.filter((e) => e.id !== id)
    await persist(updated)
    if (selectedEnvId === id) {
      setSelectedEnvId(null)
      await localforage.setItem('selectedEnvId', null)
    }
  }

  const selectEnv = async (id: string | null) => {
    setSelectedEnvId(id)
    await localforage.setItem('selectedEnvId', id)
  }

  const selectedEnv = environments.find((e) => e.id === selectedEnvId) || null

  return (
    <EnvContext.Provider
      value={{
        environments,
        selectedEnvId,
        addEnv,
        updateEnv,
        deleteEnv,
        selectEnv,
        selectedEnv,
      }}
    >
      {children}
    </EnvContext.Provider>
  )
}

export const useEnvContext = () => {
  const ctx = useContext(EnvContext)
  if (!ctx) throw new Error('useEnvContext must be used inside EnvProvider')
  return ctx
}
