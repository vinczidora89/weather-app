<script setup>
  import HeaderComponent from './components/HeaderComponent.vue';
  import CityInput from './components/CityInput.vue';
  import LoaderComponent from './components/LoaderComponent.vue';
  import LocationMap from './components/LocationMap.vue';
  import WeatherCurrent from './components/weather/WeatherCurrent.vue';
  import WeatherWrapper from './components/weather/WeatherWrapper.vue';
  import { computed } from "@vue/reactivity";
  import { useWeatherStore } from '@/stores/weather';

  const store = useWeatherStore();
  const futureWeatherData = computed(() => store.weatherForecast && store.weatherForecast.length > 0);
  const pastWeatherData = computed(() => store.weatherPast && store.weatherPast.length === 5);
</script>

<template>
  <header>
    <HeaderComponent />
  </header>

  <main>
    <CityInput></CityInput>
    <LocationMap></LocationMap>
    <div class="loader-wrapper" v-if="store.isLoading">
      <LoaderComponent></LoaderComponent>
    </div>
    <div v-else :class="['weather-data', {'is-changed': store.cityChanged}]">
      <WeatherCurrent></WeatherCurrent>
      <WeatherWrapper v-if="futureWeatherData"
                      title="Weather for the next 7 days:"
                      type="future"
                      :days="store.weatherForecast">
      </WeatherWrapper>
      <WeatherWrapper v-if="pastWeatherData"
                      title="Weather in the last 5 days:"
                      type="past"
                      :days="store.weatherPast">
      </WeatherWrapper>
    </div>
  </main>
</template>

<style lang="scss">
@import './assets/base.css';
.weather-data {
  margin: 0 auto;
  max-width: 300px;
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

  @media #{$tablet}, #{$desktop} {
    max-width: 800px;
  }
}

.loader-wrapper {
  margin: 50px auto;
  width: 100px;

  @media #{$tablet}, #{$desktop} {
    margin: 100px auto;
  }
}
</style>
