import { ResponseError, TResponse } from '@/types/Response';
import { ITeam, ITeamMember } from '@/types/Teams';
import instance from './api';

const BASE_URL = '/teams';

export const getAll = async (): Promise<TResponse<ITeam[]> | ResponseError> => {
  const response = await instance.get(BASE_URL);

  return response.data;
};

export const getMembers = async (id: string): Promise<TResponse<ITeamMember[]> | ResponseError> => {
  const response = await instance.get(`${BASE_URL}/${id}/members`);

  return response.data;
};
