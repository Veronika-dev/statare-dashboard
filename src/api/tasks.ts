import { ResponseError, ResponseSuccess, TResponse } from '@/types/Response';
import { ITask, ITaskFull } from '@/types/Tasks';
import { TDataPaginate, TPaginate } from '@/types/Paginate';
import instance from './api';

const BASE_URL = '/tasks';

export const getList = async (pagination: TPaginate): Promise<TResponse<TDataPaginate<ITask[]>> | ResponseError> => {
  const bboxKeys = Object.keys(pagination) as Array<keyof TPaginate>;
  const queryString: string = bboxKeys
    .filter((key: keyof TPaginate) => pagination[key] !== null && pagination[key] !== undefined)
    .map((key: keyof TPaginate) => `${encodeURIComponent(key)}=${encodeURIComponent(pagination[key])}`)
    .join('&');
  const response = await instance.get(`${BASE_URL}/?${queryString}`);

  return response.data;
};

export const getTaskById = async (id: number): Promise<TResponse<ITaskFull> | ResponseError> => {
  const response = await instance.get(`${BASE_URL}/${id}`);

  return response.data;
};

export const updateTask = async (id: number, payload: ITaskFull): Promise<TResponse<ITaskFull> | ResponseError> => {
  const response = await instance.put(`${BASE_URL}/${id}`, payload);

  return response.data;
};

export const createTask = async (payload: ITaskFull): Promise<TResponse<ITaskFull> | ResponseError> => {
  const response = await instance.post(`${BASE_URL}/create`, payload);

  return response.data;
};

export const deleteTask = async (id: number): Promise<ResponseSuccess | ResponseError> => {
  const response = await instance.delete(`${BASE_URL}/${id}`);

  return response.data;
};
