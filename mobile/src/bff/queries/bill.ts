
import { buildMutationHook, buildQueryHook } from '../buildHook'
import resolvers from '../schemas'

export const useBills = buildQueryHook(['bills'], resolvers.bill.Query.getAllBills)
export const useBill = buildQueryHook(['bill'], resolvers.bill.Query.getOneBill)
export const useCreateBill = buildMutationHook(['createBill'], resolvers.bill.Mutation.createBill)