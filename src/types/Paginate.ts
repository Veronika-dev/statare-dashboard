export type TPaginate = {
  limit: number;
  offset: number;
}

export type TPaginateFull = {
  total: number;
} & TPaginate

export type TDataPaginate<T> = {
  data: T;
} & TPaginateFull;
