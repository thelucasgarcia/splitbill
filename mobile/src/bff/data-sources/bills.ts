import { BaseApi } from '../base-api';
import { BillResponse, QueryGetOneBillArgs } from '../schemas/bill';

export class Bill extends BaseApi {
  override baseURL = 'https://splitbill-one.vercel.app/v1/bill'

  getAllBills() {
    return this.get<BillResponse[]>(`/`)
  }

  getOneBill({ id }: QueryGetOneBillArgs) {
    return this.get<BillResponse>(`/${id}`)
  }

}