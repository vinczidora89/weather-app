<script setup>
    import IconCity from './icons/IconCity.vue';
    import IconCloud from './icons/IconCloud.vue';
    import IconSun from './icons/IconSun.vue';
    import IconUmbrella from './icons/IconUmbrella.vue';
</script>

<template>
    <div class="header">
        <div class="header__icons">
            <IconCity></IconCity>
            <IconCloud></IconCloud>
        </div>
        <h1 class="header__title">
            Weather App
        </h1>
      <div class="header__icons">
        <IconSun></IconSun>
        <IconUmbrella></IconUmbrella>
      </div>
    </div>
</template>

<style scoped lang="scss">
    .header {
        align-items: center;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        padding: 0 0 30px;

        &__title {
            color: $color-mercury;
            margin: 0 20px;
            text-align: center;
        }

        &__icons {
            align-items: center;
            display: flex;
            fill: $color-mercury;
        }

      @media #{$tablet}, #{$desktop} {
          font-size: 24px;
      }
    }
</style>
