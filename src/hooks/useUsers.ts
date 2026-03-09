import { useCallback, useEffect, useState } from 'react'
import { fetchUsers, searchUsers } from '../api/users'
import type { User } from '../types/user'
import { useDebounce } from './useDebounce'

const LIMIT = 10

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedQuery = useDebounce(query, 400)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    const skip = (page - 1) * LIMIT

    try {
      const data = debouncedQuery.trim()
        ? await searchUsers(debouncedQuery.trim(), LIMIT, skip)
        : await fetchUsers(LIMIT, skip)

      setUsers(data.users)
      setTotal(data.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [page, debouncedQuery])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    setPage(1)
  }, [debouncedQuery])

  const totalPages = Math.ceil(total / LIMIT)

  return {
    users,
    total,
    page,
    totalPages,
    isLoading,
    error,
    query,
    setQuery,
    setPage,
    retry: load,
  }
}
