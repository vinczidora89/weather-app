<script setup>
    import { defineProps } from "@vue/runtime-core";
    import { computed } from "@vue/reactivity";
    import { useWeatherStore } from '@/stores/weather';
    import Utility from '../../Utility';
    import { defineAsyncComponent } from "vue";

    const FallbackWeatherIcon = defineAsyncComponent(() => import('./FallbackWeatherIcon.vue'));
    const store = useWeatherStore();

    const props = defineProps({
        forecast: Object,
        index: Number,
        type: String,
    });

    const date = computed(() => Utility.timestampToDate(props.forecast.dt));
    const temp = computed(() => props.type === 'past' ? props.forecast.temp : props.forecast.temp.day);
    const iconName = props.type === 'past' ? store.pastIcon(props.index) : store.forecastIcon(props.index);
    const iconUrl = computed(() => iconName && `${store.baseUrlIcons}/img/wn/${iconName}.png`);

    const isEven = (props.index + 1) % 2 === 0;
</script>

<template>
    <div :class="['weather-simple', {'is-even': isEven}]">
        <img v-if="iconName" class="weather-simple__icon" :src="iconUrl"/>
        <FallbackWeatherIcon v-else :is-small="true"></FallbackWeatherIcon>
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
        padding: 10px;

        &__icon {
            display: block;
            margin: 0 auto;
        }

        &__data {
            display: block;
            text-align: center;

            &--date {
                color: darken($color-burnt-sienna, 10%);
                font-weight: 700;
            }

            &--temp {
                font-size: 20px;
            }
        }

        @media #{$tablet}, #{$desktop} {
            &.is-even {
              background-color: darken($color-white, 10%);
            }

            & + .weather-simple {
                margin: 0 0 0 6px;
            }
        }
    }
</style>
