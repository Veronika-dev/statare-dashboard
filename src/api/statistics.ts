import { ResponseError, TResponse } from '@/types/Response';
import { IStatsItem } from '@/types/Dashboard';
import instance from './api';

const BASE_URL = '/statistics';

// eslint-disable-next-line import/prefer-default-export
export const getStatistics = async (): Promise<TResponse<IStatsItem> | ResponseError> => {
  const response = await instance.get(BASE_URL);
  return response.data;
};
