<template>
  <v-textarea
    v-bind="$attrs"
    v-on="$listeners"
    color="secondary"
    class="textarea-custom"
    hide-details="auto"
    auto-grow
    outlined
    dense
    rows="1"
  />
</template>
<style lang="scss">
.textarea-custom.v-text-field--outlined {
  &:not(.v-input--is-focused):not(.error--text) {
    .v-input__slot:not(:hover) {
      fieldset {
        border-color: transparent!important;
      }
    }
  }
}
</style>
