<script setup>
  import { reactive } from "@vue/reactivity";
  import { useWeatherStore } from '@/stores/weather';
  import LoaderComponent from '../LoaderComponent.vue';

  const store = useWeatherStore();
  const state= reactive({
    errorMessage: null,
    gettingLocation: false,
    location: null,
  });

  const getLocation = async() => {
    return new Promise((resolve, reject) => {

      if(!("geolocation" in navigator)) {
        reject(new Error('Geolocation is not available.'));
      }

      navigator.geolocation.getCurrentPosition(pos => {
        resolve(pos);
      }, err => {
        reject(err);
      });
    });
  }

  const getLocationData = async() => {
      state.gettingLocation = true;
    try {
      state.gettingLocation = false;
      const location = await getLocation();
      store.coordinates.lat = location.coords.latitude;
      store.coordinates.long = location.coords.longitude;
    } catch(e) {
      state.gettingLocation = false;
      state.errorMessage = e.message;
    }
  }

  const declineLocationData = () => {
    store.locationDataDenied = true;
    localStorage.setItem('locationDataDenied', 'true');
  }
</script>

<template>
  <div class="request-location">
    <span class="request-location__text">
      Would you like to see the weather at your current location?
    </span>
    <span class="request-location__text">
      Please give permission to use your location data by clicking on the "get location" button:
    </span>
    <div class="request-location__button-wrapper">
      <button class="request-location__button" @click="getLocationData">Get location</button>
      <button class="request-location__button--decline" @click="declineLocationData">No, thanks</button>
    </div>

    <div v-if="state.errorMessage" class="request-location__error">
      Sorry, but the following error occurred: {{ state.errorMessage }}
    </div>

    <div v-if="state.gettingLocation">
      <LoaderComponent></LoaderComponent>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .request-location {
    background-color: $color-white;
    border-radius: 4px;
    margin: 0 auto;
    max-width: 300px;
    padding: 20px;
    width: 100%;

    &__text {
      display: block;
      margin: 0 0 6px;
    }

    &__button {
      @include button-primary($color-burnt-sienna, $color-white, 0 10px);
      flex: 1 0 auto;

      &--decline {
        @include button-secondary($color-burnt-sienna, $color-white, 0 10px);
        flex: 1 0 auto;
        margin: 0 0 0 10px;
      }

      &-wrapper {
        align-items: center;
        display: flex;
        margin: 30px auto 10px;
        max-width: 360px;
      }
    }

    &__error {
      color: $color-firebrick;
    }

    @media #{$tablet}, #{$desktop} {
      max-width: 600px;

      &__button {
        &--decline {
          margin: 0 0 0 30px;
        }
      }
    }
  }
</style>
