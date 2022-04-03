<script setup>
  import { reactive } from "@vue/reactivity";
  import { useWeatherStore } from '@/stores/weather';
  import IconClose from '../icons/IconClose.vue';
  import LoaderComponent from '../LoaderComponent.vue';
  import Utility from "../../Utility";

  const store = useWeatherStore();
  const state= reactive({
    errorMessage: null,
    gettingLocation: false,
    location: null,
  });

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

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
      store.locationDataHide = true;
      store.geocodeCoordinates();
    } catch(e) {
      state.gettingLocation = false;
      state.errorMessage = e.message;
    }
  }

  const declineLocationData = () => {
    store.locationDataHide = true;
    localStorage.setItem('locationDataDenied', 'true');
  }
</script>

<template>
  <div class="request-location">
    <IconClose @click="declineLocationData" class="request-location__icon"></IconClose>
    <div class="request-location__wrapper">
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
  </div>
</template>

<style scoped lang="scss">
  .request-location {
    background-color: $color-abbey;
    color: $color-white;
    left: 0;
    margin: 0 auto;
    padding: 10px;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;

    &__wrapper {
      margin: 0 auto;
      max-width: 300px;
      width: 100%;
    }

    &__icon {
      cursor: pointer;
      position: absolute;
      right: 10px;
      top: 10px;
    }

    &__text {
      display: block;
      font-size: 12px;
      margin: 0 0 6px;
      width: calc(100% - 20px);
    }

    &__button {
      @include button-primary($color-white, $color-abbey, 0 6px);
      flex: 1 0 auto;
      font-size: 12px;
      height: 30px;

      &--decline {
        @include button-secondary($color-white, $color-white, 0 6px);
        flex: 1 0 auto;
        font-size: 12px;
        height: 30px;
        margin: 0 0 0 10px;
      }

      &-wrapper {
        align-items: center;
        display: flex;
        margin: 10px 0;
        max-width: 360px;
      }
    }

    &__error {
      color: $color-firebrick;
    }

    @media #{$tablet}, #{$desktop} {
      &__wrapper {
        max-width: 500px;
      }

      &__button {
        &--decline {
          margin: 0 0 0 30px;
        }
      }
    }
  }
</style>
