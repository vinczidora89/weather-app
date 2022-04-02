<script setup>
  /* eslint-disable no-undef */
  import { onMounted, ref } from 'vue';
  import { computed } from "@vue/reactivity";
  import { useWeatherStore } from '@/stores/weather';
  import { Loader } from '@googlemaps/js-api-loader';

  const store = useWeatherStore();
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  onMounted(async () => {
    await loader.load();
    if (store.coordinatesFilled) {
      const map = new google.maps.Map(mapDiv.value, {
        center: currentPosition.value,
        zoom: 10,
      })
      new google.maps.Marker({
        position: currentPosition.value,
        map: map,
      });
      const geocoder = new google.maps.Geocoder();
      geocoder
          .geocode({ location:  currentPosition.value })
          .then((response) => {
            if (response.results[0]) {
              store.formattedAddress = response.results[0].formatted_address;
            } else {
              store.hasError = true
            }
          })
          .catch(() => store.hasError = true);
    }
  });
  const currentPosition = computed(() => ({
    lat: store.coordinates.lat,
    lng: store.coordinates.long,
  }));
  const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
  const mapDiv = ref(null);
</script>

<template>
    <div class="location-map">
        <h2 class="location-map__title">Your current location:</h2>
        <div ref="mapDiv" class="location-map__container"></div>
    </div>
</template>

<style scoped lang="scss">
  .location-map {
      &__title {
          font-size: 16px;
          text-align: center;
      }

      &__container {
          border: 1px solid $color-abbey;
          height: 50vh;
          margin: 0 auto;
          max-height: 200px;
          max-width: 300px;
          width: 100%;
      }

      @media #{$tablet}, #{$desktop} {
          &__title {
              font-size: 20px;
          }
      }
  }
</style>
