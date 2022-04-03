<script setup>
  import HeaderComponent from './components/HeaderComponent.vue';
  import CityInput from './components/CityInput.vue';
  import LocationMap from './components/location/LocationMap.vue';
  import RequestLocation from './components/location/RequestLocation.vue';
  import WeatherCurrent from './components/weather/WeatherCurrent.vue';
  import WeatherPlaceholder from './components/weather/WeatherPlaceholder.vue';
  import WeatherWrapper from './components/weather/WeatherWrapper.vue';
  import { computed } from "@vue/reactivity";
  import { useWeatherStore } from '@/stores/weather';
  import { onMounted } from "vue";

  const store = useWeatherStore();

  const futureWeatherData = computed(() => store.weatherForecast && store.weatherForecast.length > 0);
  const pastWeatherData = computed(() => store.weatherPast && store.weatherPast.length === 5);

  const shouldShowLocationMap = computed(() =>
      store.coordinatesFilled
  );

  onMounted(() => {
    const locationDataDenied = localStorage.getItem('locationDataDenied');
    if (locationDataDenied && locationDataDenied === 'true') {
      store.locationDataHide = true;
    }
    store.getWeatherByDefaultCity('Debrecen');
  })
</script>

<template>
  <header class="app__header">
    <RequestLocation v-if="!store.locationDataHide"></RequestLocation>
    <HeaderComponent />
    <CityInput class="app__location-city"></CityInput>
  </header>

  <main class="app__main">
    <WeatherPlaceholder v-if="store.isLoading"></WeatherPlaceholder>
    <div v-else :class="['app__weather-wrapper', {'is-changed': store.cityChanged}]">
      <div class="app__current-and-map">
        <WeatherCurrent></WeatherCurrent>
        <LocationMap class="app__location-map" v-if="shouldShowLocationMap">
        </LocationMap>
      </div>
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
      <span class="app__credentials">
        Background image by Stephen O'Donnell,
        <a href="https://unsplash.com/@stephenodonn" target="_blank" class="app__credentials-link">
          Unsplash
        </a>
      </span>
    </div>
  </main>
</template>

<style lang="scss">
@import './assets/base.css';
.app {
  &__header {
    background: url('./assets/bgr_mobile.jpeg') top center no-repeat;
    padding: 150px 0 50px;
    position: relative;

    &:after {
      background: linear-gradient(transparent, $color-abbey);
      content: '';
      height: 20px;
      left: 0;
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }

  &__weather-wrapper {
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

  &__credentials {
    color: $color-white;
    display: block;
    text-align: center;

    &-link,
    &-link:active,
    &-link:hover,
    &-link:link,
    &-link:visited {
      color: $color-white;
    }
  }

  @media #{$tablet} {
    &__header {
      background: url('./assets/bgr_tablet.jpeg') top center no-repeat;
      padding: 114px 0 80px;
    }
  }

  @media #{$desktop} {
    &__header {
      background: url('./assets/bgr_desktop.jpeg') top center no-repeat;
      padding: 114px 0 80px;
    }
  }

  @media #{$tablet}, #{$desktop} {
    &__current-and-map {
      display: flex;
      justify-content: center;
      margin: 30px auto;
      max-width: 6000px;
      width: 100%;
    }

    &__current {
      flex: 0 1 400px;
    }

    &__location-map {
      flex: 0 1 200px;
      margin: 0 0 0 10px;
    }

    &__credentials {
      padding: 0 20px 0 0;
      text-align: right;
    }
  }
}

</style>
