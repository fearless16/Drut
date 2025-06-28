import type { HeaderItem } from '@/context/RequestFormContext';
import { HTTP_METHODS } from '@/constants/http'
import type { RequestFormState } from '../RequestFormContext';

export enum ActionType {
  SET_METHOD = 'SET_METHOD',
  SET_URL = 'SET_URL',
  SET_HEADERS = 'SET_HEADERS',
  SET_BODY = 'SET_BODY',
  PRESET = 'PRESET',
  RESET = 'RESET',
}

export type Action =
  | { type: ActionType.SET_METHOD; payload: HTTP_METHODS }
  | { type: ActionType.SET_URL; payload: string }
  | { type: ActionType.SET_HEADERS; payload: HeaderItem[] }
  | { type: ActionType.SET_BODY; payload: string }
  | { type: ActionType.PRESET; payload: RequestFormState }
  | { type: ActionType.RESET }


export const initialState: RequestFormState = {
  method: HTTP_METHODS.GET,
  url: '',
  headers: [],
  body: '',
}

export function reducer(
  state: RequestFormState,
  action: Action
): RequestFormState {
  switch (action.type) {
    case ActionType.SET_METHOD:
      return { ...state, method: action.payload }
    case ActionType.SET_URL:
      return { ...state, url: action.payload }
    case ActionType.SET_HEADERS:
      return { ...state, headers: action.payload }
    case ActionType.SET_BODY:
      return { ...state, body: action.payload }
    case ActionType.PRESET:
      return { ...action.payload }
    case ActionType.RESET:
      return initialState
    default:
      return state
  }
}
