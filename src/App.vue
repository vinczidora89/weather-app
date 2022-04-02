<script setup>
  import HeaderComponent from './components/HeaderComponent.vue';
  import CityInput from './components/CityInput.vue';
  import LoaderComponent from './components/LoaderComponent.vue';
  import LocationMap from './components/location/LocationMap.vue';
  import RequestLocation from './components/location/RequestLocation.vue';
  import WeatherCurrent from './components/weather/WeatherCurrent.vue';
  import WeatherWrapper from './components/weather/WeatherWrapper.vue';
  import { computed } from "@vue/reactivity";
  import { useWeatherStore } from '@/stores/weather';
  import { onMounted } from "vue";

  const store = useWeatherStore();

  const futureWeatherData = computed(() => store.weatherForecast && store.weatherForecast.length > 0);
  const pastWeatherData = computed(() => store.weatherPast && store.weatherPast.length === 5);

  const shouldShowLocationRequest = computed(() =>
      !store.locationDataDenied && !store.coordinatesFilled
  );

  const shouldShowLocationMap = computed(() =>
      store.coordinatesFilled && !store.locationDataDenied
  );

  onMounted(() => {
    const locationDataDenied = localStorage.getItem('locationDataDenied');
    if (locationDataDenied && locationDataDenied === 'true') {
      store.locationDataDenied = true;
    }
  })
</script>

<template>
  <header>
    <HeaderComponent />
  </header>

  <main>
    <RequestLocation v-if="shouldShowLocationRequest"></RequestLocation>
    <div class="app__location-wrapper">
      <CityInput class="app__location-city"></CityInput>
      <LocationMap class="app__location-map" v-if="shouldShowLocationMap">
      </LocationMap>
    </div>
    <div class="app__loader-wrapper" v-if="store.isLoading">
      <LoaderComponent></LoaderComponent>
    </div>
    <div v-else :class="['app__weather-wrapper', {'is-changed': store.cityChanged}]">
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
.app {
  &__weather-wrapper {
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
  }

  &__loader-wrapper {
    margin: 50px auto;
    width: 100px;
  }

  @media #{$tablet}, #{$desktop} {
    &__location {
      &-wrapper {
        display: flex;
        margin: 0 auto;
        max-width: 800px;
        width: 100%;
      }

      &-map {
        flex: 0 0 300px;
      }
    }

    &__weather-wrapper {
      max-width: 800px;
    }

    &__loader-wrapper {
      margin: 100px auto;
    }
  }
}

</style>
