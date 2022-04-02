<script setup>
    import { defineProps } from "@vue/runtime-core";
    import { computed } from "@vue/reactivity";
    import { useWeatherStore } from '@/stores/weather';
    import Utility from '../../Utility';

    const store = useWeatherStore();

    const props = defineProps({
        forecast: Object,
        index: Number,
        type: String,
    });

    const date = computed(() => Utility.timestampToDate(props.forecast.dt));
    const temp = computed(() => props.type === 'past' ? props.forecast.temp : props.forecast.temp.day);
    const iconName = props.type === 'past' ? store.pastIcon(props.index) : store.forecastIcon(props.index);
    const iconUrl = computed(() => `${store.baseUrlIcons}/img/wn/${iconName}.png`);
</script>

<template>
    <div class="weather-simple">
        <img v-if="store.currentIcon" class="weather-simple__icon" :src="iconUrl"/>
        <span class="weather-simple__data weather-simple__data--date">
            {{ date }}
        </span>
        <span class="weather-simple__data weather-simple__data--temp">
            {{ Math.round(temp) }} &deg;C
        </span>
        <span class="weather-simple__data">{{ props.forecast.weather[0].main }}</span>
    </div>
</template>

<style scoped lang="scss">
    .weather-simple {
        background-color: $color-white;
        border-radius: 4px;
        box-shadow: 3px 3px 4px $color-black-transparent;
        padding: 10px 14px;

        &__data {
            display: block;

            &--date {
                color: darken($color-burnt-sienna, 10%);
                font-weight: 700;
            }

            &--temp {
                font-size: 20px;
            }
        }

        @media #{$tablet}, #{$desktop} {
            & + .weather-simple {
                margin: 0 0 0 6px;
            }
        }
    }
</style>
