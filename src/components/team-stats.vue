<template>
  <div class="text-left mb-4">
    <h5 class="text-body-1 text--secondary text-uppercase font-weight-regular">{{ team }}</h5>
    <div class="text--white">
      <v-tooltip bottom nudge-top="20" color="tertiary">
        <template v-slot:activator="{ on, attrs }">
          <span class="text-h2" v-bind="attrs" v-on="on">{{closed}}</span>
        </template>
        <span>Closed tasks</span>
      </v-tooltip>
      <v-tooltip bottom nudge-top="10" color="tertiary">
        <template v-slot:activator="{ on, attrs }">
          <span class="text-h4" v-bind="attrs" v-on="on">/{{total}}</span>
        </template>
        <span>Total tasks with due date before<br>today or status "Closed"</span>
      </v-tooltip>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue, { PropType } from 'vue';
import { IStatsObj } from '@/types/Dashboard';

@Component
export default class TeamStats extends Vue {
  @Prop({ type: String, required: true }) team!: string;

  @Prop({ type: Object as PropType<IStatsObj>, required: true }) stats!: IStatsObj;

  get total() {
    return this.stats.total || 0;
  }

  get closed() {
    return this.stats.closed || 0;
  }
}
</script>
