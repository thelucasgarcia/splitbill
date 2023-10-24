import { useCallback } from 'react';
import { useUrl } from './useUrl'

interface Paginate {
  page: number,
  pageSize: number
}

export default function usePaginate(page = 0, pageSize = 5) {
  const { get, append, replace } = useUrl();

  const paginationModel = {
    page: Number(get("page")) || page,
    pageSize: Number(get("pageSize")) || pageSize,
  }

  const setPaginationModel = useCallback((paginate: Paginate) => {
    replace(
      append(
        ['page', paginate.page],
        ['pageSize', paginate.pageSize]
      )
    )
  }, [append, replace])
  
  return { paginationModel, setPaginationModel } 
}