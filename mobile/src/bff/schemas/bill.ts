import { dataSources } from '../data-sources'

export interface BillResponse {
  id: string
  name: string
  user: {
    id: string
    name: string
    email: string
  }
  userId: string
  total: number
  items: any[]
  members: {
    id: string
    billId: string
    memberId: string
    member: {
      id: string
      name: string
    }
  }[]
  description: string
  editValues: boolean
  inviteMembers: boolean
  tag: string[]
  createdAt: string
  updatedAt: string
}
export interface QueryGetOneBillArgs {
  id: string
}

export interface MutationCreateBillArgs {
  name: string
  description: string
  tag?: string[]
}

export const resolvers = {
  Query: {
    getAllBills: () => dataSources.bill.getAllBills(),
    getOneBill: (params: QueryGetOneBillArgs) => dataSources.bill.getOneBill(params),
  },
  Mutation: {
    createBill: (params: MutationCreateBillArgs) => dataSources.bill.createBill(params)
  },
}
