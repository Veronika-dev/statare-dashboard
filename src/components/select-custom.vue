<template>
  <v-select
    label="Select"
    color="secondary"
    hide-details="auto"
    single-line
    outlined
    dense
    item-color="white"
    :menu-props="{ contentClass: 'info' }"
    v-bind="$attrs"
    v-on="$listeners"
  ></v-select>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class SelectCustom extends Vue {
}
</script>
<style lang="scss">
.info .theme--dark.v-list {
  background: var(--info);
}
.v-select.v-text-field--outlined {
  .v-select__selection--comma {
    font-size: 14px;
  }
  &:not(.v-input--is-focused) {
    .v-input__slot:not(:hover) {
      .v-input__icon--append {
        opacity: 0;
      }
      fieldset {
        border-color: transparent!important;
      }
    }
  }
}
</style>
