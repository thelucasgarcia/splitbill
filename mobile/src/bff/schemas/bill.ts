import { dataSources } from '../data-sources'

export interface BillResponse {
  id: string
  name: string
  user: User
  userId: string
  total: number
  items: any[]
  members: Members[]
  description: string
  editValues: boolean
  inviteMembers: boolean
  tag: string[]
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
}

export interface Members {
  id: string
  billId: string
  memberId: string
  member: Member
}

export interface Member {
  id: string
  name: string
}

export interface QueryGetOneBillArgs {
  id: string
}


export const resolvers = {
  Query: {
    getAllBills: () => dataSources.bill.getAllBills(),
    getOneBill: (params: QueryGetOneBillArgs) => dataSources.bill.getOneBill(params),
  },
  Mutation: {
  },
}
