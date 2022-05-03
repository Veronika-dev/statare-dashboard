import { ResponseError, TResponse } from '@/types/Response';
import { ITeam, ITeamMember, ITeamsObj } from '@/types/Teams';
import { ITeamsState, TStore } from '@/types/Store';
import * as teamsApi from '../api/teams';

const SET_TEAMS_DICTIONARY = 'SET_TEAMS_DICTIONARY';
const SET_TEAM_MEMBERS = 'SET_TEAM_MEMBERS';

export default {
  namespaced: true,
  state: {
    teams: null,
  },
  getters: {
    getTeamsMap(state: ITeamsState) {
      return state.teams;
    },
  },
  mutations: {
    [SET_TEAMS_DICTIONARY](state: ITeamsState, payload: ITeam[]) {
      state.teams = payload.reduce((result, item: ITeam) => Object.assign(result, { [item.id]: { name: item.name } }), {});
    },
    [SET_TEAM_MEMBERS](state: ITeamsState, { data, id }: { data: ITeamMember[], id: string }) {
      if (state.teams[id]) {
        const newTeams: ITeamsObj = { ...state.teams };
        newTeams[id].members = data;
        state.teams = newTeams;
      }
    },
  },
  actions: {
    async getTeamsCatalog({ commit }: TStore<ITeamsState>) {
      await teamsApi.getAll()
        .then((response: TResponse<ITeam[]> | ResponseError) => {
          if ('success' in response) {
            if (response.success && response.data) {
              commit(SET_TEAMS_DICTIONARY, response.data);
            }
          } else {
            commit('general/SET_ERROR', response.message, { root: true });
          }
        })
        .catch((error: ResponseError) => {
          commit('general/SET_ERROR', error.message, { root: true });
        });
    },
    async getTeamMembers({ commit }: TStore<ITeamsState>, id: string) {
      await teamsApi.getMembers(id)
        .then((response: TResponse<ITeamMember[]> | ResponseError) => {
          if ('success' in response) {
            if (response.success && response.data) {
              commit(SET_TEAM_MEMBERS, { data: response.data, id });
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
