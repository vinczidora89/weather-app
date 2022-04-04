<script setup></script>

<template>
    <span class="credentials-component">
      Background image by Stephen O'Donnell,
      <a href="https://unsplash.com/@stephenodonn" target="_blank" class="credentials-component__link">
        Unsplash
      </a>
    </span>
</template>

<style scoped lang="scss">
    .credentials-component {
      color: $color-white;
      display: block;
      padding: 20px 0;
      text-align: center;

      &__link,
      &__link:active,
      &__link:hover,
      &__link:link,
      &__link:visited {
        color: $color-white;
      }

      @media #{$tablet}, #{$desktop} {
        padding: 20px;
        text-align: right;
      }
    }
</style>
