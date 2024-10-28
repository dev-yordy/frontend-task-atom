export interface PaginatedResponse<T> {
    page: number;
    totalRecords: number;
    data: T[];
  }
  