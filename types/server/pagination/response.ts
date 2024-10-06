export interface PaginatedResponseType<T> {
  contents?: T[]
  nextPage?: number
  page?: number
  pageRequest?: {
    page?: number
    size?: number
    sort?: {
      property?: string
      direction?: SortDirectionEnum
    }
    offset?: number
  }
  totalElements?: number
  totalPages?: number
}

enum SortDirectionEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}
