<script lang="ts" setup>
import UiButton from '@/components/ui/buttons/UiButton.vue';
import UiTextDecorated from '@/components/ui/typos/UiTextDecorated.vue';
</script>

<template>
  <div class="home-page">
    <main>
      <UiTextDecorated class="home-page__title" tag="h1">JAKMALL VUE</UiTextDecorated>

      <div class="home-page__cta">
        <UiButton to="/checkout">Checkout</UiButton>
      </div>
    </main>
  </div>
</template>

<style lang="stylus" scoped>
.home-page
  width: 100%
  min-height: 100vh
  display: flex
  align-items: center
  justify-content: center

  &__title
    margin-bottom: 2rem

  &__cta
    display: flex
    align-items: center
    justify-content: center
</style>
