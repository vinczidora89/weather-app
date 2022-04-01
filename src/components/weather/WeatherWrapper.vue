<script setup>
    import WeatherSimple from './WeatherSimple.vue';
    import { defineProps } from "@vue/runtime-core";

    const props = defineProps({
        days: Array,
        title: String,
        type: String,
    });
</script>

<template>
    <div class="weather-wrappper">
        <h2 class="weather-wrappper__title">
            {{ props.title }}
        </h2>
        <div class="weather-wrappper__wrapper">
            <WeatherSimple v-for="(day, index) in props.days"
                           :key="index"
                           :index="index"
                           :forecast="day"
                           :type="props.type">
            </WeatherSimple>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .weather-wrappper {
        background-color: lighten($color-abbey, 10%);
        border-radius: 4px;
        box-shadow: 3px 3px 4px $color-black-transparent;
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        width: 100%;

        &__title {
            color: $color-white;
            margin: 0 auto 20px;
            text-align: center;
        }

        &__wrapper {
            display: grid;
            grid-template-columns: auto auto;
            grid-template-rows: auto;
            gap: 10px 10px;
        }

        @media #{$tablet}, #{$desktop} {
            &__wrapper {
                display: flex;
                justify-content: center;
                gap: 0;
            }
        }
    }
</style>
