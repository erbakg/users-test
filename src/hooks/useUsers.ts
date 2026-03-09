import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { fetchUsers, searchUsers } from '../api/users'
import type { User } from '../types/user'
import { useDebounce } from './useDebounce'

const LIMIT = 10

interface FetchState {
  users: User[]
  total: number
  isLoading: boolean
  error: string | null
}

type FetchAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; users: User[]; total: number }
  | { type: 'FETCH_ERROR'; error: string }

const initialState: FetchState = {
  users: [],
  total: 0,
  isLoading: true,
  error: null,
}

const fetchReducer = (state: FetchState, action: FetchAction): FetchState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null }
    case 'FETCH_SUCCESS':
      return { users: action.users, total: action.total, isLoading: false, error: null }
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.error }
  }
}

export const useUsers = () => {
  const [state, dispatch] = useReducer(fetchReducer, initialState)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  const debouncedQuery = useDebounce(query, 400)
  const abortRef = useRef<AbortController | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const setQueryWithReset = useCallback((q: string) => {
    setQuery(q)
    setPage(1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    abortRef.current?.abort()
    abortRef.current = controller

    const skip = (page - 1) * LIMIT
    const trimmedQuery = debouncedQuery.trim()

    dispatch({ type: 'FETCH_START' })

    const request = trimmedQuery
      ? searchUsers(trimmedQuery, LIMIT, skip, controller.signal)
      : fetchUsers(LIMIT, skip, controller.signal)

    request
      .then((data) => {
        dispatch({ type: 'FETCH_SUCCESS', users: data.users, total: data.total })
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        const message = err instanceof Error ? err.message : 'Something went wrong'
        dispatch({ type: 'FETCH_ERROR', error: message })
      })

    return () => controller.abort()
  }, [page, debouncedQuery, retryCount])

  const totalPages = Math.ceil(state.total / LIMIT)

  const retry = useCallback(() => {
    setRetryCount((c) => c + 1)
  }, [])

  return {
    users: state.users,
    total: state.total,
    page,
    totalPages,
    isLoading: state.isLoading,
    error: state.error,
    query,
    setQuery: setQueryWithReset,
    setPage,
    retry,
  }
}
