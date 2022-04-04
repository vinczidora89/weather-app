<script setup>
  import { defineAsyncComponent } from 'vue';
  import { computed } from '@vue/reactivity';
  import { useWeatherStore } from '@/stores/weather';

  const LocationMap = defineAsyncComponent(() => import('../location/LocationMap.vue'));
  const WeatherCurrent = defineAsyncComponent(() => import('./WeatherCurrent.vue'));
  const WeatherPlaceholder = defineAsyncComponent(() => import('./WeatherPlaceholder.vue'));
  const WeatherSimpleWrapper = defineAsyncComponent(() => import('./WeatherSimpleWrapper.vue'));

  const store = useWeatherStore();

  const futureWeatherData = computed(() => store.weatherFuture && store.weatherFuture.length > 0);
  const pastWeatherData = computed(() => store.weatherPast && store.weatherPast.length === 5);
  const shouldShowLocationMap = computed(() =>
      store.coordinatesFilled
  );
</script>

<template>
  <Suspense>
    <div :class="['weather-wrapper__data', {'is-changed': store.cityChanged}]">-->
      <div class="weather-wrapper__current-and-map">
        <WeatherCurrent></WeatherCurrent>
        <LocationMap class="weather-wrapper__location-map" v-if="shouldShowLocationMap">
        </LocationMap>
      </div>
      <WeatherSimpleWrapper v-if="futureWeatherData"
                      title="Weather in the next 7 days:"
                      type="future"
                      :days="store.weatherFuture">
      </WeatherSimpleWrapper>
      <WeatherSimpleWrapper v-if="pastWeatherData"
                      title="Weather in the last 5 days:"
                      type="past"
                      :days="store.weatherPast">
      </WeatherSimpleWrapper>
    </div>

    <template #fallback>
      <WeatherPlaceholder></WeatherPlaceholder>
    </template>
  </Suspense>
</template>

<style scoped lang="scss">
  .weather-wrapper {
    &__data {
      margin: 0 auto;
      padding: 10px 0;
      width: 100%;

      &.is-changed {
        position: relative;

        &:after {
          background-color: $color-white;
          content: '';
          display: block;
          height: 100%;
          left: 0;
          opacity: .3;
          position: absolute;
          top: 0;
          width: 100%;
        }
      }
    }

    @media #{$tablet-and-desktop} {
      &__current-and-map {
        display: flex;
        justify-content: center;
        margin: 30px auto;
        max-width: 6000px;
        width: 100%;
      }

      &__location-map {
        flex: 0 1 200px;
        margin: 0 0 0 10px;
      }
    }
  }
</style>
