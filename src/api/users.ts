import type { UsersResponse } from '../types/user'

const BASE_URL = 'https://dummyjson.com'

export const fetchUsers = async (
  limit: number,
  skip: number,
): Promise<UsersResponse> => {
  const res = await fetch(
    `${BASE_URL}/users?limit=${limit}&skip=${skip}&select=id,firstName,lastName,age,email,phone,image,company,address`,
  )
  if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`)
  return res.json()
}

export const searchUsers = async (
  query: string,
  limit: number,
  skip: number,
): Promise<UsersResponse> => {
  const res = await fetch(
    `${BASE_URL}/users/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}&select=id,firstName,lastName,age,email,phone,image,company,address`,
  )
  if (!res.ok) throw new Error(`Failed to search users: ${res.status}`)
  return res.json()
}
