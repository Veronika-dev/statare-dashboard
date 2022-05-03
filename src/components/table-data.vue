<template>
  <v-data-table
    v-on="$listeners"
    :headers="headers"
    :items="data"
    item-key="name"
    disable-sort
    :options.sync="options"
    :server-items-length="total"
    class="elevation-1 transparent table-data"
    :item-class="trClassName"
  >
    <template v-slot:item.due_date="{ item }">
      {{ item && item.due_date ? formatDate(item.due_date) : '' }}
    </template>
    <template v-slot:item.team="{ item }">
      {{ item ? getTeamName(item.team_id) : '' }}
    </template>
  </v-data-table>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { DataOptions, DataTableHeader } from 'vuetify';
import dayjs from 'dayjs';
import { ITeamsObj, TTeams } from '@/types/Teams';
import { Getter } from 'vuex-class';
import { TaskStatusesKeys } from '@/types/Tasks';

@Component
export default class TableData extends Vue {
  @Getter('teams/getTeamsMap') teams!: ITeamsObj;

  @Prop({ type: Array, required: true }) data!: object[];

  @Prop({ type: Array, required: true }) headers!: DataTableHeader[];

  @Prop({ type: Number }) selectedId?: number;

  @Prop({ type: Number }) limit!: number;

  @Prop({ type: Number }) offset!: number;

  @Prop({ type: Number }) total!: number;

  options: DataOptions = {
    page: 1,
    itemsPerPage: 10,
    sortBy: [],
    sortDesc: [],
    groupBy: [],
    groupDesc: [],
    multiSort: false,
    mustSort: false,
  };

  @Watch('options', { deep: true })
  watchOptions() {
    const { page, itemsPerPage } = this.options;
    this.$emit('update-data', { offset: (page - 1) * itemsPerPage, limit: itemsPerPage });
  }

  formatDate(date: number) {
    return dayjs.utc(date).format('YYYY-MM-DD');
  }

  getTeamName(team: TTeams) {
    return this.teams && team ? this.teams[team].name : '';
  }

  trClassName(val: { id: number, status: string }) {
    return `included ${val.id === this.selectedId ? 'tr--selected' : ''} ${val.status === TaskStatusesKeys.CLOSED ? 'tr--closed' : ''}`;
  }

  mounted() {
    console.log(this.total);
  }
}
</script>
<style lang="scss">
.theme--dark.table-data.v-data-table {
  > .v-data-table__wrapper {
    min-height: 500px;
    >table>tbody {
      > tr {
        cursor: pointer;
        &:hover {
          &:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
            background: rgba(255, 255, 255, .1);
          }
        }
        &.tr--selected {
          background: rgba(255, 255, 255, .2)!important;
          opacity: 1!important;
        }
        &.tr--closed {
          &:not(:hover) {
            opacity: .3;
          }
        }
      }
    }
  }
}
</style>
