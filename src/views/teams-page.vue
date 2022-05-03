<template>
  <v-container class="pa-0 relative overflow-hidden rounded-lg">
    <h1 class="text-left text-h4 font-weight-black px-6 pt-4 mb-4">Teams</h1>
    <keep-alive v-if="teams">
      <v-tabs vertical background-color="transparent" class="tabs-teams pb-4"
              @change="loadMembers">
        <v-tab v-for="[id, item] in Object.entries(teams)" :key="id"
               :href="`#${id}`" class="justify-start"
        >{{ item.name }}</v-tab>
          <v-tab-item v-for="[id, item] in Object.entries(teams)" :key="id" :id="id" class="pl-3">
            <v-list v-if="item.members" color="transparent" class="text-left">
              <v-list-item v-for="member in item.members" :key="member.id">
                <v-list-item-avatar color="rgba(255, 255, 255, .1)">
                  <v-icon :size="20">$user</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{`${member.name} ${member.surname}`}}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.name }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <div v-else class="pa-5 text-center">
              <v-progress-circular
                indeterminate
                color="primary"
              />
            </div>
          </v-tab-item>
      </v-tabs>
    </keep-alive>
    <div v-else class="pa-5 pb-10 text-center">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { ITeamsObj } from '@/types/Teams';
import { Getter, Action } from 'vuex-class';

@Component
export default class TeamsPage extends Vue {
  @Getter('teams/getTeamsMap') teams!: ITeamsObj | null;

  @Action('teams/getTeamMembers') getTeamMembers!: (id: string) => void;

  async loadMembers(id: string) {
    if (this.teams && !this.teams[id]?.members) {
      await this.getTeamMembers(id);
    }
  }
}
</script>
<style lang="scss">
.tabs-teams .theme--dark.v-tabs-items {
  background: transparent!important;
  border-left: 1px solid rgba(255, 255, 255, .2);
}
</style>
