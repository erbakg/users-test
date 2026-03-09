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
  company: {
    name: string
    department: string
    title: string
  }
  address: {
    city: string
    state: string
  }
}

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}
