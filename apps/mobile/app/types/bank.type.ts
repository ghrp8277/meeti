export interface Bank {
  id: number;
  code: string;
  name: string;
}

export interface BankPaginationResponse {
  success: boolean;
  data: {
    data: Bank[];
    meta: {
      currentPage: number;
      limit: number;
      count: number;
      totalPage: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
  };
}
