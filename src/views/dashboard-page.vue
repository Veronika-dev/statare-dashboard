<template>
  <v-container>
    <v-row class="pl-4">
      <v-col class="py-6 pr-6">
        <h1 class="text-left text-h4 font-weight-black">Dashboard</h1>
        <h3 class="text-left text--subtitles">Productivity overview</h3>
        <v-row v-if="stats" class="mb-6 mt-3">
          <v-col v-for="[key, item] in Object.entries(stats)" :key="key">
            <progress-circular v-if="item" :total="item.total" :closed="item.closed" />
            <h4 class="text--subtitles mt-2">{{ getTeamName(key) }}</h4>
          </v-col>
        </v-row>
        <statistics-sparkline v-if="chartData" :chart-data="chartData" />
        <h3 v-if="chartData" class="text--subtitles text-body-1 mt-3">Closed tasks count by date</h3>
      </v-col>
      <v-col class="pa-0" cols="3">
        <div class="d-flex flex-column align-stretch fill-height">
          <div v-if="stats" class="info py-6 px-6 flex">
            <team-stats v-for="[teamId, item] in Object.entries(stats)" :key="teamId"
                        :team="getTeamName(teamId)" :stats="item"
            />
            <team-stats v-if="totalTasksInfo" team="Total" :stats="totalTasksInfo" />
          </div>
          <div class="secondary py-8 px-6 flex d-flex align-center">
            <p class="mb-0">This application is a simple way to manage teams tasks</p>
          </div>
        </div>
      </v-col>
      <v-col class="py-6 pl-4 overflow-hidden relative rounded-r-lg image-bright" cols="3">
        <div class="image-bright--cover text--white pt-8 px-8">There might be something useful here :)</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IChartItem, IStatsItem, IStatsObj } from '@/types/Dashboard';
import ProgressCircular from '@/components/progress-circular.vue';
import StatisticsSparkline from '@/components/statistics-sparkline.vue';
import { Getter, Action } from 'vuex-class';
import { ITeamsObj, TTeams } from '@/types/Teams';
import TeamStats from '@/components/team-stats.vue';

@Component({
  components: { TeamStats, StatisticsSparkline, ProgressCircular },
})
export default class DashboardView extends Vue {
  @Getter('teams/getTeamsMap') teams!: ITeamsObj;

  @Getter('dashboard/getStats') stats!: IStatsItem | null;

  @Getter('dashboard/getChartData') chartData!: IChartItem[] | null;

  @Action('dashboard/getStatistics') getStatistics!: () => void;

  getTeamName(team: TTeams) {
    return this.teams && team ? this.teams[team].name : '';
  }

  get totalTasksInfo() {
    return this.stats ? Object.values(this.stats).reduce((acc, value: IStatsObj) => ({
      total: acc.total + value.total,
      closed: acc.closed + value.closed,
    }), { total: 0, closed: 0 }) : null;
  }

  mounted() {
    this.getStatistics();
  }
}
</script>
<style lang="scss" scoped>
.image-bright--cover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .56);
}
.image-bright {
  background-image: url("~/src/assets/cyprus-ok.jpeg");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
}
</style>
