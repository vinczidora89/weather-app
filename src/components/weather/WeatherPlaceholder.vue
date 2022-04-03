<script setup></script>

<template>
  <div class="weather-placeholder">
    <div class="weather-placeholder__current-and-map">
      <div class="weather-placeholder__current">
        <div class="weather-placeholder__current-title"></div>
        <div class="weather-placeholder__current-icon"></div>
        <div class="weather-placeholder__current-weather"></div>
        <div class="weather-placeholder__current-temp"></div>
        <div class="weather-placeholder__current-temp"></div>
        <div class="weather-placeholder__current-temp"></div>
        <div class="weather-placeholder__current-temp"></div>
        <div class="weather-placeholder__current-details"></div>
      </div>
      <div class="weather-placeholder__map"></div>
    </div>
    <div class="weather-placeholder__wrapper">
      <div class="weather-placeholder__wrapper-title"></div>
      <div class="weather-placeholder__wrapper-container">
        <div v-for="num in 7" :key="num" class="weather-placeholder__simple">
          <div class="weather-placeholder__simple-icon"></div>
          <div class="weather-placeholder__simple-date"></div>
          <div class="weather-placeholder__simple-temp"></div>
        </div>
      </div>
    </div>
    <div class="weather-placeholder__wrapper">
      <div class="weather-placeholder__wrapper-container">
        <div v-for="num in 5" :key="num" class="weather-placeholder__simple">
          <div class="weather-placeholder__simple-icon"></div>
          <div class="weather-placeholder__simple-date"></div>
          <div class="weather-placeholder__simple-temp"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .weather-placeholder {
    opacity: 0.8;

    &__current-and-map {
      @media #{$tablet}, #{$desktop} {
        align-items: center;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        max-width: 6000px;
        width: 100%;
      }
    }

    &__current {
      background-color: $color-white;
      border-radius: 4px;
      box-shadow: 3px 3px 4px $color-black-transparent;
      height: 422px;
      max-width: 400px;
      margin: 20px auto;
      padding: 20px;
      width: 100%;

      @media #{$tablet}, #{$desktop} {
        flex: 0 1 400px;
        margin: 30px 0;
      }

      &-title {
        background-color: $color-mercury;
        height: 35px;
        margin: 0 auto;
        width: 200px;
      }

      &-icon {
        background-color: $color-mercury;
        border-radius: 50px;
        height: 100px;
        margin: 10px auto;
        width: 100px;
      }

      &-weather {
        background-color: $color-burnt-sienna;
        height: 35px;
        margin: 0 auto 20px;
        width: 260px;
      }

      &-temp {
        background-color: $color-mercury;
        height: 20px;
        margin: 10px 0;
        width: 100px;
      }

      &-details {
        background-color: $color-mercury;
        height: 26px;
        margin: 20px 0 0;
        width: 145px;
      }
    }

    &__map {
      background-color: $color-white;
      border-radius: 4px;
      height: 50vh;
      margin: 0 auto;
      max-height: 421px;
      max-width: 400px;
      width: 100%;

      @media #{$tablet}, #{$desktop} {
        flex: 0 1 200px;
        margin: 0 0 0 10px;
      }
    }

    &__wrapper {
      background-color: lighten($color-abbey, 10%);
      border-radius: 4px;
      box-shadow: 3px 3px 4px $color-black-transparent;
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      width: 100%;

      &-title {
        background-color: $color-white;
        margin: 0 auto 20px;
        width: 276px;
      }

      &-container {
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto;
        gap: 10px 10px;

        @media #{$tablet}, #{$desktop} {
          display: flex;
          justify-content: center;
          gap: 0;
        }
      }
    }

    &__simple {
      background-color: $color-white;
      border-radius: 4px;
      box-shadow: 3px 3px 4px $color-black-transparent;
      height: 153px;
      padding: 10px;

      &-icon {
        background-color: $color-mercury;
        border-radius: 50px;
        height: 50px;
        margin: 0 auto;
        width: 50px;
      }

      &-date {
        background-color: $color-burnt-sienna;
        height: 22px;
        margin: 6px 0;
        width: 100%;
      }

      &-temp {
        background-color: $color-mercury;
        margin: 6px 0;
        height: 32px;
        width: 100%;
      }

      &.is-even {
        background-color: darken($color-white, 10%);
      }

      @media #{$tablet}, #{$desktop} {
        margin: 0 6px 0 0;
      }
    }
  }
</style>
