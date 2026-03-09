export interface UserCompany {
  name: string
  department: string
  title: string
}

export interface UserAddress {
  city: string
  state: string
}

export interface User {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  image: string
  company: UserCompany
  address: UserAddress
}

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}
