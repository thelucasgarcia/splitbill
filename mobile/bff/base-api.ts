import { Context } from './context';
import { DataSourceProps } from './data-sources';
import { RestApi } from './rest-api';

export class BaseApi extends RestApi{
  protected context: Context
  constructor(options: DataSourceProps) {
    super()
    this.context = options.context
  }
}