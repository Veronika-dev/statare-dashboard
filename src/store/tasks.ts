import { ITask, ITaskFull } from '@/types/Tasks';
import { ITasksState, TStore } from '@/types/Store';
import { ResponseError, ResponseSuccess, TResponse } from '@/types/Response';
import { TDataPaginate, TPaginate, TPaginateFull } from '@/types/Paginate';
import * as tasksApi from '@/api/tasks';

const SET_TASKS_LIST = 'SET_TASKS_LIST';
const SET_OPENED_TASK = 'SET_OPENED_TASK';
const CLEAR_OPENED_TASK = 'CLEAR_OPENED_TASK';
const TOGGLE_IS_TASK_OPENED = 'TOGGLE_IS_TASK_OPENED';
const SET_TOTAL = 'SET_TOTAL';

export default {
  namespaced: true,
  state: {
    tasks: null,
    total: 0,
    openedTask: null,
    isTaskOpened: false,
  },
  getters: {
    getIsTaskOpened(state: ITasksState): boolean {
      return state.isTaskOpened;
    },
    getOpenedTask(state: ITasksState): ITaskFull | null {
      return state.openedTask;
    },
    tasksList(state: ITasksState): ITask[] {
      return state.tasks?.data;
    },
    getTotal(state: ITasksState): number {
      return state.total;
    },
    tasksPagination(state: ITasksState): TPaginateFull {
      return {
        limit: state.tasks?.limit,
        offset: state.tasks?.offset,
        total: state.tasks?.total,
      };
    },
  },
  mutations: {
    [SET_TASKS_LIST](state: ITasksState, payload: TDataPaginate<ITask[]>) {
      state.tasks = payload;
    },
    [SET_OPENED_TASK](state: ITasksState, payload: ITaskFull) {
      state.openedTask = payload;
    },
    [CLEAR_OPENED_TASK](state: ITasksState) {
      state.openedTask = null;
    },
    [TOGGLE_IS_TASK_OPENED](state: ITasksState, value: boolean) {
      state.isTaskOpened = value;
      if (!value) {
        state.openedTask = null;
      }
    },
    [SET_TOTAL](state: ITasksState, value: number) {
      state.total = value;
    },
  },
  actions: {
    async getTasksList({ commit }: TStore<ITasksState>, payload: TPaginate) {
      await tasksApi.getList(payload)
        .then((response: TResponse<TDataPaginate<ITask[]>> | ResponseError) => {
          if ('success' in response) {
            if (response.success && response.data) {
              commit(SET_TASKS_LIST, response.data);
              commit(SET_TOTAL, response.data.total);
            }
          } else {
            commit('general/SET_ERROR', response.message, { root: true });
          }
        })
        .catch((error: ResponseError) => {
          commit('general/SET_ERROR', error.message, { root: true });
        });
    },
    async getTasksById({ commit }: TStore<ITasksState>, id: number) {
      await tasksApi.getTaskById(id)
        .then((response: TResponse<ITaskFull> | ResponseError) => {
          if ('success' in response) {
            if (response.success && response.data) {
              commit(SET_OPENED_TASK, response.data);
            }
          } else {
            commit('general/SET_ERROR', response.message, { root: true });
          }
        })
        .catch((error: ResponseError) => {
          commit('general/SET_ERROR', error.message, { root: true });
        });
    },
    async updateTask({ commit, dispatch, state }: TStore<ITasksState>, { id, task }: { id: number, task: ITaskFull }) {
      await tasksApi.updateTask(id, task)
        .then((response: TResponse<ITaskFull> | ResponseError) => {
          if ('success' in response) {
            if (response.success) {
              if (task.title || task.status || task.due_date || task.team_id) {
                dispatch('getTasksList', {
                  limit: state.tasks.limit,
                  offset: state.tasks.offset,
                });
              }
            }
          } else {
            commit('general/SET_ERROR', response.message, { root: true });
          }
        })
        .catch((error: ResponseError) => {
          commit('general/SET_ERROR', error.response.data.message, { root: true });
        });
    },
    async createTask({ commit, dispatch, state }: TStore<ITasksState>, task: ITaskFull) {
      await tasksApi.createTask(task)
        .then((response: TResponse<ITaskFull> | ResponseError) => {
          if ('success' in response) {
            if (response.success) {
              if (task.title || task.status || task.due_date || task.team_id) {
                commit(TOGGLE_IS_TASK_OPENED, false);
                dispatch('getTasksList', {
                  limit: state.tasks.limit,
                  offset: state.tasks.offset,
                });
              }
            }
          } else {
            commit('general/SET_ERROR', response.message, { root: true });
          }
        })
        .catch((error: ResponseError) => {
          commit('general/SET_ERROR', error.response.data.message, { root: true });
        });
    },
    async deleteTask({ commit, dispatch, state }: TStore<ITasksState>, id: number) {
      await tasksApi.deleteTask(id)
        .then((response: ResponseSuccess | ResponseError) => {
          if ('success' in response) {
            if (response.success) {
              commit(TOGGLE_IS_TASK_OPENED, false);
              dispatch('getTasksList', {
                limit: state.tasks.limit,
                offset: state.tasks.offset,
              });
            }
          } else {
            commit('general/SET_ERROR', response.message, { root: true });
          }
        })
        .catch((error: ResponseError) => {
          commit('general/SET_ERROR', error.message, { root: true });
        });
    },
    toggleIsTaskOpened({ commit }: TStore<ITasksState>, value: boolean) {
      commit(TOGGLE_IS_TASK_OPENED, value);
    },
  },
  modules: {
  },
};
