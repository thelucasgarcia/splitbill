import { BaseApi } from '../base-api';
import { BillResponse, MutationCreateBillArgs, QueryGetAllBillArgs, QueryGetOneBillArgs } from '../schemas/bill';

export class Bill extends BaseApi {
  override baseURL = 'https://splitbill-one.vercel.app/v1/bill'

  async getAllBills(params?: QueryGetAllBillArgs) {
    const response = await this.get<BillResponse[]>(`/`, { params })
    if (params?.search) {
      const filtered = response.filter(el => el.name.includes(params.search))
      return filtered
    }
    return response
  }

  getOneBill({ id }: QueryGetOneBillArgs) {
    return this.get<BillResponse>(`/${id}`)
  }

  createBill(params: MutationCreateBillArgs) {
    return this.post<BillResponse, MutationCreateBillArgs>('/', params)
  }
}