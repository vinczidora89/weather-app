<script setup>
  import { defineProps } from '@vue/runtime-core';
  import WeatherSimple from './WeatherSimple.vue';

  const props = defineProps({
    days: Array,
    title: String,
    type: String,
  });
</script>

<template>
  <div class="weather-simple-wrappper">
    <h2 class="weather-simple-wrappper__title">
      {{ props.title }}
    </h2>
    <div class="weather-simple-wrappper__wrapper">
      <WeatherSimple v-for="(day, index) in props.days"
                     :key="index"
                     :index="index"
                     :forecast="day"
                     :type="props.type">
      </WeatherSimple>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .weather-simple-wrappper {
    margin: 20px auto;
    max-width: 600px;
    padding: 20px;
    width: 100%;

    &__title {
      color: $color-white;
      margin: 0 auto 20px;
      text-align: center;
    }

    &__wrapper {
      display: grid;
      grid-template-columns: auto auto;
      grid-template-rows: auto;
      gap: 10px 10px;
    }

    @media #{$tablet-and-desktop} {
      background-color: lighten($color-abbey, 10%);
      border-radius: 4px;
      box-shadow: 3px 3px 4px $color-black-transparent;

      &__wrapper {
        display: flex;
        justify-content: center;
        gap: 0;
      }
    }
  }
</style>
