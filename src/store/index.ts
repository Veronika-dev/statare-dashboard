import Vue from 'vue';
import Vuex from 'vuex';
import general from './general';
import dashboard from './dashboard';
import tasks from './tasks';
import teams from './teams';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    general,
    dashboard,
    tasks,
    teams,
  },
});
