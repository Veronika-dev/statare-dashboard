import { IGeneralState, TStore } from '@/types/Store';

const SET_ERROR = 'SET_ERROR';
const CLEAR_ERROR = 'CLEAR_ERROR';

export default {
  namespaced: true,
  state: {
    error: null,
  },
  getters: {
    getError: (state: IGeneralState) => state.error,
  },
  mutations: {
    [SET_ERROR](state: IGeneralState, payload: string) {
      state.error = payload;
    },
    [CLEAR_ERROR](state: IGeneralState) {
      state.error = null;
    },
  },
  actions: {
    showErrors({ commit }: TStore<IGeneralState>, error: string) {
      commit(SET_ERROR, error);
    },
    clearError({ commit }: TStore<IGeneralState>) {
      commit(CLEAR_ERROR);
    },
  },
};
