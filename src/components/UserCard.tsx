import type { User } from '../types/user'

interface UserCardProps {
  user: User
}

export const UserCard = ({ user }: UserCardProps) => {
  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <img
        src={user.image}
        alt={fullName}
        className="h-14 w-14 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-semibold text-slate-900">
          {fullName}
        </h3>
        <p className="mt-0.5 truncate text-sm text-slate-500">{user.email}</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
          <span>{user.phone}</span>
          <span>Age: {user.age}</span>
        </div>
        {user.company && (
          <p className="mt-1.5 truncate text-xs text-slate-400">
            {user.company.title} at {user.company.name}
          </p>
        )}
      </div>
    </div>
  )
}
