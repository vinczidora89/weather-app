<script setup>
  /* eslint-disable no-undef */
  import { onUnmounted, onMounted, ref } from 'vue';
  import { computed } from "@vue/reactivity";
  import { useWeatherStore } from '@/stores/weather';
  import { Loader } from '@googlemaps/js-api-loader';

  const store = useWeatherStore();
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  let watcher = null;

  onMounted(async () => {
    store.checkForLocationPermission();

    watcher = navigator.geolocation.watchPosition(position => {
      store.coordinates.lat = position.coords.latitude;
      store.coordinates.long = position.coords.longitude;
    })
    await loader.load();
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
  })

  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher);
  });

  const currentPosition = computed(() => ({
      lat: store.coordinates.lat,
      lng: store.coordinates.long
  }));

  const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
  const mapDiv = ref(null);
</script>

<template>
    <div class="location-map">
        <div ref="mapDiv" class="location-map__container"></div>
    </div>
</template>

<style scoped lang="scss">
  .location-map {
      &__container {
          border: 1px solid $color-abbey;
          height: 50vh;
          margin: 0 auto;
          width: 90%;

          @media #{$tablet}, #{$desktop} {
              width: 50%;
          }
      }
  }
</style>
