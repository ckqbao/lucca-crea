import { BaseModel } from './types'

export type User = BaseModel & {
  name: string
  surname: string
  email: string
  role: string
  isEmailVerified: boolean
  lastPasswordUpdate: string
  active: boolean
  firstAccess: boolean
  deleted: boolean
  fullname: string
}
