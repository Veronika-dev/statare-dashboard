<template>
  <v-app>
    <v-snackbar
      v-if="error"
      :timeout="4000"
      :value="!!error"
      absolute
      centered
      right
      top
      color="red accent-2"
      @input="clearError"
    >
      {{ error }}
    </v-snackbar>
    <v-main class="px-2">
      <v-container class="main-container mt-16 mb-10 rounded-lg pa-0">
        <router-view/>
      </v-container>
    </v-main>
    <navigation-menu />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import NavigationMenu from '@/components/navigation-menu.vue';
import { Action, Getter } from 'vuex-class';
import { ITeam } from '@/types/Teams';

@Component({
  components: { NavigationMenu },
})

export default class extends Vue {
  @Getter('general/getError') error!: string | null;

  @Action('general/clearError') clearError!: void;

  @Action('teams/getTeamsCatalog') getTeamsCatalog!: () => ITeam[];

  created() {
    this.getTeamsCatalog();
  }
}
</script>

<style lang="scss">
body {
  font-family: "Open Sans",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.text--subtitles {
  color: var(--v-tertiary-base);
}
.v-main {
  background-image: url("~/src/assets/cyprus.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
}
.main-container {
  background: rgba(255, 255, 255, .05);
  box-shadow: 0 5px 5px 0 rgba(25, 25, 25, .22);
}
.relative {
  position: relative;
}
</style>
