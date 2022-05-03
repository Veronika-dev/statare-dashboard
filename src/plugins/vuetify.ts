import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import {
  mdiFolder, mdiMenu, mdiEqualizer, mdiViewList, mdiAccountGroup, mdiAccount,
  mdiCalendar, mdiCheckCircleOutline, mdiCheckBold, mdiClose, mdiPlus, mdiDotsVertical,
} from '@mdi/js';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    options: { customProperties: true },
    themes: {
      dark: {
        primary: '#f3595b',
        secondary: '#6aac9c',
        accent: '#5769f0',
        error: '#FF5252',
        info: '#308090',
        success: '#579d59',
        warning: '#FFC107',
        tertiary: '#838f9d',
        quaternary: '#a5b1bb',
      },
    },
  },
  icons: {
    iconfont: 'mdiSvg',
    values: {
      folder: mdiFolder,
      menu: mdiMenu,
      dashboard: mdiEqualizer,
      tasks: mdiViewList,
      team: mdiAccountGroup,
      user: mdiAccount,
      calendar: mdiCalendar,
      status: mdiCheckCircleOutline,
      check: mdiCheckBold,
      close: mdiClose,
      add: mdiPlus,
      more: mdiDotsVertical,
    },
  },
});
