<script setup></script>

<template>
  <div class="loader">
    <div class="loader__item"></div>
    <div class="loader__item"></div>
    <div class="loader__item"></div>
    <div class="loader__item"></div>
  </div>
</template>

<style scoped lang="scss">
  .loader {
    display: inline-block;
    height: 100px;
    position: relative;
    width: 100px;

    &__item {
      animation: loader-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border: 8px solid $color-burnt-sienna;
      border-color: $color-burnt-sienna transparent transparent transparent;
      border-radius: 50%;
      box-sizing: border-box;
      display: block;
      height: 92px;
      margin: 8px;
      position: absolute;
      width: 92px;

      &:nth-child(1) {
        animation-delay: -0.45s;
      }

      &:nth-child(2) {
        animation-delay: -0.3s;
      }

      &:nth-child(3) {
        animation-delay: -0.15s;
      }
    }
  }

  @keyframes loader-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

</style>
