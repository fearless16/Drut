import React, {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'
import { type Action, reducer, initialState, ActionType } from './reducer/requestFormTypes'
import type { HeaderItem } from '@/components/RequestBuilder/HeaderEditor'
import type { HTTP_METHODS } from '@/constants/http'

export interface RequestFormState {
  method: HTTP_METHODS
  url: string
  headers: HeaderItem[]
  body: string
}

interface RequestFormContextType {
  state: RequestFormState
  dispatch: Dispatch<Action>
  setPreset: (preset: RequestFormState) => void
  resetForm: () => void
}

const RequestFormContext = createContext<RequestFormContextType | null>(null)

export const RequestFormProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setPreset = (preset: RequestFormState) =>
    dispatch({ type: ActionType.PRESET, payload: preset })

  const resetForm = () => dispatch({ type: ActionType.RESET })

  return (
    <RequestFormContext.Provider
      value={{ state, dispatch, setPreset, resetForm }}
    >
      {children}
    </RequestFormContext.Provider>
  )
}

export const useRequestFormContext = () => {
  const ctx = useContext(RequestFormContext)
  if (!ctx)
    throw new Error(
      'useRequestFormContext must be used within RequestFormProvider'
    )
  return ctx
}
