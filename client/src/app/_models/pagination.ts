export interface Pagination {
    currentPage: number;
    itemsperPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}