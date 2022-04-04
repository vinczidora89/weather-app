<script setup>
  /* eslint-disable no-undef */
  import { onMounted, ref, watch } from 'vue';
  import { computed } from "@vue/reactivity";
  import { useWeatherStore } from '@/stores/weather';
  import { Loader } from '@googlemaps/js-api-loader';

  const store = useWeatherStore();
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const renderMap = async() => {
    await loader.load();
    if (store.coordinatesFilled) {
      const map = new google.maps.Map(mapDiv.value, {
        center: currentPosition.value,
        disableDefaultUI: true,
        zoom: 10,
      })
      new google.maps.Marker({
        position: currentPosition.value,
        map: map,
      });
    }
  }

  onMounted(() => {
    renderMap();
  });

  watch(
      () => store.weatherCity,
      () => {
        renderMap();
      },
  )

  const currentPosition = computed(() => ({
    lat: store.coordinates.lat,
    lng: store.coordinates.long,
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
          height: 50vh;
          margin: 0 auto;
          max-height: 421px;
          max-width: 400px;
          width: 100%;
      }
  }
</style>
