import { IDashboardState, TStore } from '@/types/Store';
import * as statApi from '@/api/statistics';
import { ResponseError, TResponse } from '@/types/Response';
import { IChartStatsItem, IStatsItem } from '@/types/Dashboard';

const SET_STATISTICS = 'SET_STATISTICS';
const SET_CHART_DATA = 'SET_CHART_DATA';

export default {
  namespaced: true,
  state: {
    stats: null,
    chartData: null,
  },
  getters: {
    getStats(state: IDashboardState) {
      return state.stats;
    },
    getChartData(state: IDashboardState) {
      return state.chartData;
    },
  },
  mutations: {
    [SET_STATISTICS](state: IDashboardState, payload: IStatsItem) {
      state.stats = payload;
    },
    [SET_CHART_DATA](state: IDashboardState, payload: IChartStatsItem[]) {
      state.chartData = payload;
    },
  },
  actions: {
    async getStatistics({ commit }: TStore<IDashboardState>) {
      await statApi.getStatistics()
        .then((response: TResponse<IStatsItem> | ResponseError) => {
          if ('success' in response) {
            if (response.success && response.data) {
              commit(SET_STATISTICS, response.data.stats);
              commit(SET_CHART_DATA, response.data.chart);
            }
          } else {
            commit('general/SET_ERROR', response.message, { root: true });
          }
        })
        .catch((error: ResponseError) => {
          commit('general/SET_ERROR', error.message, { root: true });
        });
    },
  },
  modules: {
  },
};
