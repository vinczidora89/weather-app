<script setup>
    import { useWeatherStore } from '@/stores/weather';
    import { computed } from "@vue/reactivity";
    import cities from 'cities.json';

    const store = useWeatherStore();

    store.$subscribe((mutation, state) => {
      if (state.formattedAddress) {
        const addressCity = state.formattedAddress.split(',')[0];
        const matchingCity = () => {
          return cities.find(city => {
            if (addressCity === city.name) {
              return city;
            }
          })
        };

        console.log(matchingCity());
      }
    });

    const shouldShowOptions = computed(() => {
        return store.searchTerm !== store.selectedCity;
    });

    const searchButtonDisabled = computed(() => {
      return store.weatherCity && !store.cityChanged;
    });

    const searchCities = computed(() => {
        if (store.searchTerm === '' || store.searchTerm === null) {
            return [];
        }

        let matchCount = 0;
        return cities.filter(city => {
            if (city.name.toLowerCase().includes(store.searchTerm.toLowerCase()) && matchCount < 10) {
                matchCount++;
                return city
            }
        })
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
            background-color: $color-burnt-sienna;
            border: 0;
            border-radius: 8px;
            color: $color-white;
            cursor: pointer;
            font-family: Roboto, Arial, Helvetica, sans-serif;
            font-size: 16px;
            flex: 0 0 106px;
            height: 40px;
            line-height: 40px;
            outline: unset;
            margin: 0 0 0 10px;
            padding: 0 20px;
            text-transform: uppercase;

            &:hover {
                background-color: darken($color-burnt-sienna, 10%);
            }

            &:focus {
                border: 0;
                box-shadow: 0 0 0 2px $color-black;
                outline: unset;
            }

            &:disabled {
                background-color: lighten($color-burnt-sienna, 20%);
                cursor: not-allowed;
            }
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
