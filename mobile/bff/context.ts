import { createDataSources } from './data-sources'
import { QueryCache } from '@tanstack/react-query'
export class Context {
  public dataSources: ReturnType<typeof createDataSources>

  constructor() {
    const cache = new QueryCache()
    this.dataSources = createDataSources({ cache, context: this })
  }
}
