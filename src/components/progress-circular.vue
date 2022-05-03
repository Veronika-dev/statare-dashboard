<template>
  <v-progress-circular
    :rotate="-90"
    :size="140"
    :width="15"
    :value="percentValue"
    :color="color"
  >
    <span class="text-h5">{{percentValue}}%</span>
  </v-progress-circular>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class ProgressCircular extends Vue {
  @Prop({ type: Number, required: true }) total!: number;

  @Prop({ type: Number, required: true }) closed!: number;

  get percentValue() {
    if (!this.total) return 0;
    return Math.ceil((this.closed / this.total) * 100);
  }

  get color() {
    if (this.percentValue > 75) return '#83d7c0';
    if (this.percentValue > 45) return '#ffc875';
    return 'primary';
  }
}
</script>
<style lang="scss">
.v-progress-circular>svg .v-progress-circular__overlay {
  stroke-linecap: round;
  animation: progress-circular-dash-2 2s ease forwards!important;
}
@keyframes progress-circular-dash-2 {
  0% {
    stroke-dashoffset: 125px;
  }
  100% {
    stroke-dashoffset: 85px/2;
  }
}
</style>
