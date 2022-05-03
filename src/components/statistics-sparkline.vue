<template>
  <v-sparkline
          :value="values"
          :labels="labels"
          :gradient="gradient"
          :smooth="10"
          :padding="15"
          :line-width="6"
          height="130"
          label-size="9"
          stroke-linecap="round"
          gradient-direction="top"
          type="trend"
          auto-draw
          color="#ffffff"
        ></v-sparkline>
</template>
<script lang="ts">
import { PropType } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IChartItem } from '@/types/Dashboard';
import dayjs from 'dayjs';

@Component
export default class StatisticsSparkline extends Vue {
  @Prop({ type: Array as PropType<IChartItem[]>, required: true }) chartData!: IChartItem[];

  gradient: string[] = ['#83d7c0', '#ffc875', '#f3595b'];

  get values(): number[] {
    return this.chartData.map((item: IChartItem) => item.count);
  }

  get labels(): string[] {
    return this.chartData.map((item: IChartItem) => dayjs.utc(item.status_date).format('DD.MM'));
  }
}
</script>\
