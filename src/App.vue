<script setup>
  import { onMounted, defineAsyncComponent } from 'vue';
  import CityInput from './components/CityInput.vue';
  import CredentialsComponent from './components/CredentialsComponent.vue';
  import HeaderComponent from './components/HeaderComponent.vue';
  import WeatherWrapper from './components/weather/WeatherWrapper.vue';
  import { useWeatherStore } from './stores/weather';
  import Utility from './Utility';

  const ErrorMessage = defineAsyncComponent(() => import('./components/ErrorMessage.vue'));
  const RequestLocation = defineAsyncComponent(() => import('./components/location/RequestLocation.vue'));

  const store = useWeatherStore();

  onMounted(() => {
    const cityParam = Utility.getUrlParam('city');
    const initialCity = (store.getCityFromList(cityParam) && store.getCityFromList(cityParam).name) || 'Budapest';
    const locationDataDenied = localStorage.getItem('locationDataDenied');
    if (locationDataDenied && locationDataDenied === 'true') {
      store.locationDataHide = true;
    }
    store.getWeatherByDefaultCity(initialCity);
  })
</script>

<template>
  <header class="app__header">
    <RequestLocation v-if="!store.locationDataHide"></RequestLocation>
    <HeaderComponent title="Weather App"/>
    <CityInput class="app__location-city"></CityInput>
  </header>

  <main class="app__main">
    <ErrorMessage v-if="store.hasError"></ErrorMessage>
    <WeatherWrapper></WeatherWrapper>
    <CredentialsComponent></CredentialsComponent>
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
}

</style>
