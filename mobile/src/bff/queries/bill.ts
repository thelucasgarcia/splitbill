
import { buildMutationHook, buildQueryHook } from '../buildHook'
import resolvers from '../schemas'

export const useBills = buildQueryHook('getAllBills', resolvers.bill.Query.getAllBills)
export const useBill = buildQueryHook('getOneBill', resolvers.bill.Query.getOneBill)
export const useCreateBill = buildMutationHook('createBill', resolvers.bill.Mutation.createBill)