<script setup>
    import FallbackWeatherIcon from './FallbackWeatherIcon.vue';
    import WeatherDetails from './WeatherDetails.vue';
    import { useWeatherStore } from '@/stores/weather';
    import { computed } from "@vue/reactivity";

    const store = useWeatherStore();

    const iconUrl = computed(() => `${store.baseUrlIcons}/img/wn/${store.currentIcon}@2x.png`);
</script>

<template>
    <div class="weather-current" v-if="store.weatherCurrent">
        <div class="weather-current__data">
            <span class="weather-current__location">
              {{ store.weatherCity }} ({{ store.weatherCountry }}):
            </span>
            <img v-if="store.currentIcon" class="weather-current__icon" :src="iconUrl"/>
            <FallbackWeatherIcon v-else></FallbackWeatherIcon>
            <span class="weather-current__description">
                {{ store.currentWeather.main }}
                ({{ store.currentWeather.description }})
            </span>
            <span class="weather-current__temperature-main">
                     {{ Math.round(store.currentTemperature) }} &deg;C
            </span>
            <span class="weather-current__temperature-details">
              (min: {{ Math.round(store.todaysTemperatures.min) }} &deg;C, max: {{ Math.round(store.todaysTemperatures.max) }} &deg;C )
            </span>
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
        margin: 20px auto;
        padding: 10px;
        width: 80%;

        &__icon {
            display: block;
            margin: 0 auto;
            width: 80px;
        }

        &__location {
            display: block;
            font-size: 26px;
            text-align: center;
        }

        &__description {
            color: $color-burnt-sienna;
            display: block;
            font-size: 20px;
            font-weight: 700;
            text-align: center;
        }

        &__temperature {
            &-main {
                display: block;
                font-size: 20px;
                margin: 0 auto;
                text-align: center;
            }

            &-details {
                display: block;
                font-size: 16px;
                font-style: italic;
                margin: 0 auto;
                text-align: center;
            }
        }

        @media #{$tablet}, #{$desktop} {
            margin: 0;

            &__icon {
                margin: 10px auto;
                width: 100px;
            }

            &__location {
                font-size: 30px;
            }

            &__description {
                font-size: 22px;
            }

            &__temperature {
                &-main {
                    font-size: 26px;
                    margin: 20px auto 0;
                }

                &-details {
                    font-size: 20px;
                }
          }
        }
    }
</style>
