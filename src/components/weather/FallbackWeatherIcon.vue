<script setup>
  import IconUmbrella from '../icons/IconUmbrella.vue';
  import { defineProps } from "@vue/runtime-core";

  const props = defineProps({
    isSmall: Boolean,
  });
</script>

<template>
  <div :class="['placeholder-icon', {'is-small': props.isSmall}]">
    <IconUmbrella class="placeholder-icon__image"></IconUmbrella>
  </div>
</template>

<style scoped lang="scss">
  .placeholder-icon {
    align-items: center;
    background-color: $color-abbey;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    height: 100px;
    margin: 0 auto;
    opacity: 0.5;
    padding: 10px;
    width: 100px;

    &__image {
      fill: $color-white;
      flex: 0 0 58px;
      height: 58px;
    }

    &.is-small {
      height: 50px;
      width: 50px;

      .placeholder-icon {
        &__image {
          fill: $color-white;
          flex: 0 0 24px;
          height: 24px;
        }
      }
    }
  }
</style>
