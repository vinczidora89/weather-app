<script setup>
    import ChevronIcon from '../icons/IconChevron.vue'
    import { useWeatherStore } from '@/stores/weather';
    import {reactive} from "@vue/reactivity";

    const state= reactive({
        isOpen: false,
    });

    const toggleOpen = () => {
        state.isOpen = !state.isOpen;
    };

    const store = useWeatherStore();
</script>

<template>
    <div :class="['weather-details', {'is-open': state.isOpen}]">
        <div class="weather-details__header" @click="toggleOpen">
            <ChevronIcon class="weather-details__header-icon"/>
            <span class="weather-details__header-text">
                Weather details
            </span>
        </div>
        <Transition name="details-fade">
            <div v-if="state.isOpen" class="weather-details__content">
                <div class="weather-details__data-wrapper">
                    <span class="weather-details__data-label">Wind Speed:</span>
                    <span class="weather-details__data-number">{{ store.weatherCurrent.wind_speed }} m/sec</span>
                </div>
                <div class="weather-details__data-wrapper">
                    <span class="weather-details__data-label">Humidity:</span>
                    <span class="weather-details__data-number">{{ store.weatherCurrent.humidity }} %</span>
                </div>
                <div class="weather-details__data-wrapper">
                    <span class="weather-details__data-label">Pressure:</span>
                    <span class="weather-details__data-number">{{ store.weatherCurrent.pressure }} hPa</span>
                </div>
                <div class="weather-details__data-wrapper">
                    <span class="weather-details__data-label">Sunrise/Sunset Time:</span>
                    <span class="weather-details__data-number">{{ store.currentSunrise }} / {{ store.currentSunset }}</span>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
    .weather-details {
        margin: 20px 0;

        &__header {
            align-items: center;
            cursor: pointer;
            display: flex;
            margin: 10px 0;

            &__icon {
                transition: transform .5s ease-out;
                transform: rotate(0);
            }

            &-text {
                font-size: 16px;
                font-weight: 700;
            }
        }

        &__data {
            &-wrapper {
              color: $color-abbey;
            }

            &-label {
                display: inline-block;
                font-weight: 700;
                margin: 0 10px 0 0;
            }
        }

        &.is-open {
            .weather-details {
                &__header {
                    &-icon {
                        transition: transform .5s ease-out;
                        transform: rotate(180deg);
                    }
                }
            }
        }
    }

    .details-fade-enter-active {
        opacity: 1;
        transition: opacity 0.5s ease-out;
    }

    .details-fade-leave-active {
        transition: opacity 0.5s ease-in-out;
    }

    .details-fade-enter-from,
    .details-fade-leave-to {
        opacity: 0;
    }
</style>
