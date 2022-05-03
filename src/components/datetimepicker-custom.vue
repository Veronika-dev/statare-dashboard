<template>
  <v-menu
    ref="menu"
    v-model="menu"
    color="secondary"
    :attach="attach"
    transition="scale-transition"
    offset-y
    nudge-top="20"
    min-width="auto"
    light
    max-width="none"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-bind="attrs"
        v-on="on"
        v-model="dateValue"
        color="secondary"
        class="datepicker-input pt-0 mt-0"
        outlined
        dense
        readonly
        hide-details="auto"
      />
    </template>
    <v-date-picker
      v-model="dateValue"
      color="secondary"
      @input="menu = false"
    />
  </v-menu>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import dayjs from 'dayjs';
import { Prop } from 'vue-property-decorator';

@Component
export default class DatetimepickerCustom extends Vue {
  @Prop({ type: String, default: '' }) attach?: string;

  @Prop({ type: String, default: '' }) value?: string;

  @Prop({ type: Boolean, default: false }) isDatetime?: boolean;

  menu = false;

  get dateValue() {
    return this.value ? dayjs.utc(this.value).format(`YYYY-MM-DD${this.isDatetime ? ' HH:mm:ss' : ''}`) : '';
  }

  set dateValue(value: string) {
    this.$emit('input', value ? dayjs.utc(value).format(`YYYY-MM-DD${this.isDatetime ? ' HH:mm:ss' : ''}`) : '');
  }
}
</script>
<style lang="scss">
.datepicker-input.v-text-field--outlined {
  .v-text-field__slot input {
    font-size: 14px;
  }
  &:not(.v-input--is-focused) {
    .v-input__slot:not(:hover) {
      fieldset {
        border-color: transparent!important;
      }
    }
  }
}
</style>
