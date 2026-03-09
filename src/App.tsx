import { SearchBar } from './components/SearchBar'
import { UserCard } from './components/UserCard'
import { Pagination } from './components/Pagination'
import { Spinner } from './components/Spinner'
import { useUsers } from './hooks/useUsers'

function App() {
  const {
    users,
    total,
    page,
    totalPages,
    isLoading,
    error,
    query,
    setQuery,
    setPage,
    retry,
  } = useUsers()

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Users</h1>
        <p className="mt-1 text-sm text-slate-500">
          {total} users found
        </p>
      </header>

      <div className="mb-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p>{error}</p>
          <button
            onClick={retry}
            className="mt-2 font-medium text-red-600 underline hover:text-red-800"
          >
            Try again
          </button>
        </div>
      )}

      {isLoading ? (
        <Spinner />
      ) : users.length === 0 ? (
        <div className="py-20 text-center text-slate-400">
          No users found
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}

      <div className="mt-8">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}

export default App
