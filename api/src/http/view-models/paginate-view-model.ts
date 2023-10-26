import { URLSearchParams } from 'url';

interface PaginateResponse<T> {
  data: T[];
  count: number;
  nextPage?: string;
  prevPage?: string;
}

export class PaginateViewModel {
  static toPaginateResponse<T>(
    data: T[],
    count: number,
    page: number,
    pageSize: number,
  ): PaginateResponse<T> {
    const totalPages = Math.ceil(count / pageSize);
    const nextPage = () => {
      const url = new URLSearchParams();
      url.append('page', String(Number(page) + 1));
      url.append('pageSize', String(pageSize));
      return page < totalPages ? url.toString() : null;
    };

    const prevPage = () => {
      const url = new URLSearchParams();
      url.append('page', String(page - 1));
      url.append('pageSize', String(pageSize));
      return page > totalPages ? url.toString() : null;
    };

    return { data, count, nextPage: nextPage(), prevPage: prevPage() };
  }
}
