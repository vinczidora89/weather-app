<script setup>
    import { useWeatherStore } from '@/stores/weather';
    import { computed } from "@vue/reactivity";
    import cities from 'cities.json';
    import {  watch } from "vue";

    const store = useWeatherStore();

    watch(
        () => store.formattedAddress,
        (newVal) => {
          if (newVal) {
            const addressCity = newVal.split(',')[0];
            let matchingCity = null;
            cities.find(city => {
              if (addressCity === city.name) {
                matchingCity = city;
              }
            });

            if (matchingCity) {
              store.selectedCity = matchingCity.name;
              store.searchTerm = matchingCity.name;
              store.selectedCountry = matchingCity.country;
              store.getWeatherData();
            }
          }
        }
    )

    const shouldShowOptions = computed(() => {
        return store.searchTerm !== store.selectedCity;
    });

    const searchButtonDisabled = computed(() => {
      return store.weatherCity && !store.cityChanged;
    });

    const searchCities = computed(() => {
        const selectedCities = [];
        if (store.searchTerm === '' || store.searchTerm === null) {
            return selectedCities;
        }
        cities.filter(city => {
            if (city.name.toLowerCase().includes(store.searchTerm.toLowerCase()) && selectedCities.length < 10) {
                selectedCities.push(city);
            }
        })
        return selectedCities;
    });

    const selectCity = (city) => {
        store.selectedCity= city.name;
        store.selectedCountry= city.country;
        store.searchTerm = city.name;
        store.setCoordinates({lat: city.lat, long: city.lng})
    };
</script>

<template>
    <div class="city-input">
        <h2 class="city-input__title">
            Where do you want to see the weather?
        </h2>
        <div class="city-input__wrapper">
            <div class="city-input__input-wrapper">
                <label for="weather-city" class="city-input__label">
                    City:
                </label>
                <input type="text"
                       autocomplete="off"
                       name="weather-city"
                       id="weather-city"
                       class="city-input__input"
                       v-model="store.searchTerm">
                <ul v-if="searchCities.length && shouldShowOptions"
                    class="city-input__options">
                    <li v-for="(city, index) in searchCities"
                        class="city-input__option"
                        :key="index"
                        @click="selectCity(city)">
                        {{ city.name }}
                    </li>
                </ul>
            </div>
            <button class="city-input__button"
                    @click="store.getWeatherData" :disabled="searchButtonDisabled">
                Search
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .city-input {
        align-items: center;
        margin: 20px auto;
        max-width: 300px;
        width: 100%;

        &__title {
            font-size: 16px;
            margin: 0 0 10px;
        }

        &__wrapper {
            align-items: flex-end;
            display: flex;
            justify-content: space-between;
        }

        &__label {
            display: block;
            font-size: 14px;
            font-weight: 700;
            margin: 0 0 6px;
        }

        &__input-wrapper {
            flex: 1 1 auto;
            position: relative;
        }

        &__input {
            border: 1px solid $color-black;
            border-radius: 4px;
            display: block;
            outline: none;
            padding: 10px;
            width: 100%;

            &:active,
            &:focus {
                border: 2px solid $color-black;
            }
        }

        &__options {
            background-color: $color-white;
            border: 1px solid $color-black;
            border-top: none;
          border-radius: 0 0 4px 4px;
            padding: 0;
            left: 0;
            list-style: none;
            position: absolute;
            top: 62px;
            width: 100%;
            z-index: 1;
        }

        &__option {
            cursor: pointer;
            font-size: 14px;
            line-height: 2;
            padding: 6px 10px;

            &:hover {
                background-color: lighten($color-burnt-sienna, 20%);
            }
        }

        &__button {
          @include button-primary();
          margin: 0 0 0 10px;
        }

        @media #{$tablet}, #{$desktop} {
            max-width: 400px;

            &__title {
                font-size: 20px;
            }

            &__label {
                font-size: 12px;
            }
        }
    }
</style>
