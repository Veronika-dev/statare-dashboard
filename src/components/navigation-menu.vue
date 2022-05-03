<template>
  <div>
    <v-navigation-drawer
      v-model="isOpened"
      absolute
      temporary
      color="#1c263e"
    >
      <v-list>
        <v-list-item class="pr-4 pl-0">
          <v-list-item-content class="logo mx-auto">
            <v-list-item-title
              class="font-weight-bold text-h4 mb-0"
            >
              Statare
            </v-list-item-title>
            <v-list-item-subtitle
              class="logo--level-2 font-italic text-right"
            >SOLUTIONS</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        nav
        dense
      >
        <v-list-item link exact to="/">
          <v-list-item-icon>
            <v-icon>$dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-left">Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/tasks">
          <v-list-item-icon>
            <v-icon>$tasks</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-left">Tasks</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/teams">
          <v-list-item-icon>
            <v-icon>$team</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-left">Teams</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-btn icon absolute left top large @click.stop="toggleMenu">
      <v-icon large color="rgba(255, 255, 255, .6)">$menu</v-icon>
    </v-btn>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NavigationMenu extends Vue {
  isOpened = false;

  toggleMenu() {
    this.isOpened = !this.isOpened;
  }
}
</script>
<style lang="scss" scoped>
.v-application {
  .logo {
    width: 120px;
    flex: none;
    &--level-2 {
      font-size: .6em;
      letter-spacing: .16em;
    }
  }
}
</style>
