<script setup></script>

<template>
  <div class="error-message">
    <span class="error-message__text">Unfortunately something went wrong.</span>
    <span class="error-message__text">Please try again!</span>
  </div>
</template>

<style scoped lang="scss">
  .error-message {
    background: $color-mercury;
    border-radius: 4px;
    margin: 10px auto;
    padding: 10px;
    width: 300px;

    &__text {
      color: $color-firebrick;
      display: block;
      font-size: 16px;
      text-align: center;
    }
  }
</style>
