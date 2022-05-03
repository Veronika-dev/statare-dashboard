<script lang="ts">
import Vue from 'vue';
import { createSimpleTransition } from 'vuetify/lib/components/transitions/createTransition';

const myTransition = createSimpleTransition('slide-transition');

export default Vue.component('slide-transition', myTransition);
</script>
<style lang="scss">
.slide-transition {
  &-enter-active {
    transition: transform .2s ease-in!important;
  }
  &-leave-active {
    transition: transform .5s cubic-bezier(0.23, 1, 0.32, 1)!important;
  }

  &-enter-to {
    width: 55%;
    transform: translateX(0);
  }

  &-enter, &-leave-to {
    width: 0;
    transform: translateX(100%);
  }
}
</style>
