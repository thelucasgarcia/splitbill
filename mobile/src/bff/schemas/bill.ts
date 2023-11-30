import { dataSources } from '../data-sources'

export interface QueryGetAllBillArgs {
  search: string
}
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
  items: {
      id: string,
      billId: string,
      name: string,
      quantity: number,
      price: number,
      type: "EQUALLY" | "PERCENTAGE",
      createdAt: Date,
      updatedAt: Date
  }[]
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
    getAllBills: (params?: QueryGetAllBillArgs) => dataSources.bill.getAllBills(params),
    getOneBill: (params: QueryGetOneBillArgs) => dataSources.bill.getOneBill(params),
  },
  Mutation: {
    createBill: (params: MutationCreateBillArgs) => dataSources.bill.createBill(params)
  },
}
