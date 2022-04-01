<script setup>
    import WeatherDetails from './WeatherDetails.vue';
    import { useWeatherStore } from '@/stores/weather';
    import { computed } from "@vue/reactivity";

    const store = useWeatherStore();

    const iconUrl = computed(() => `http://openweathermap.org/img/wn/${store.currentIcon}@2x.png`);
</script>

<template>
    <div class="weather-current" v-if="store.weatherCurrent">
        <div class="weather-current__data">
            <span class="weather-current__location">
              {{ store.weatherCity }} ({{ store.weatherCountry }}):
            </span>
            <img v-if="store.currentIcon" class="weather-current__icon" :src="iconUrl"/>
            <span class="weather-current__description">
                {{ store.currentWeather.main }}
                ({{ store.currentWeather.description }})
            </span>
            <span class="weather-current__data-title">
              Temperatures:
            </span>
            <div class="weather-current__data-wrapper">
                <span class="weather-current__data-label">Current:</span>
                <span>
                     {{ Math.round(store.todaysTemperatures.day) }} &deg;C
                </span>
            </div>
            <div class="weather-current__data-wrapper">
                <span class="weather-current__data-label">Highest:</span>
                <span>
                     {{ Math.round(store.todaysTemperatures.max) }} &deg;C
                </span>
            </div>
            <div class="weather-current__data-wrapper">
                <span class="weather-current__data-label">Lowest:</span>
                <span>
                     {{ Math.round(store.todaysTemperatures.min) }} &deg;C
                </span>
            </div>
        </div>

        <WeatherDetails></WeatherDetails>
    </div>
</template>

<style scoped lang="scss">
    .weather-current {
        background-color: $color-white;
        border-radius: 4px;
        box-shadow: 3px 3px 4px $color-black-transparent;
        max-width: 400px;
        margin: 30px auto;
        padding: 20px;
        width: 100%;

        &__icon {
            display: block;
            margin: 10px auto;
        }

        &__location {
            display: block;
            font-size: 30px;
            text-align: center;
        }

        &__description {
            color: $color-burnt-sienna;
            display: block;
            font-size: 22px;
            font-weight: 700;
            text-align: center;
        }

        &__data {
            color: $color-abbey;

            &-title {
              display: block;
              font-size: 16px;
              font-weight: 700;
              margin: 10px 0;
            }

            &-label {
                display: inline-block;
                font-weight: 700;
                margin: 0 10px 0 0;
            }
        }
    }
</style>
