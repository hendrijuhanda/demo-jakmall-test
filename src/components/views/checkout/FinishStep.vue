<script lang="ts" setup>
import UiTextDecorated from '../../ui/typos/UiTextDecorated.vue'
import BackLink from './BackLink.vue'
</script>

<template>
  <section class="finish">
    <div>
      <UiTextDecorated tag="h2" class="finish__salute"> Thank You </UiTextDecorated>

      <div>
        <div class="finish__order-id">Order ID: HAFSF5</div>
        <div class="finish__desc">Your order will be delivered today with GO-SEND</div>
      </div>

      <div class="finish__backlink">
        <BackLink to="/">Go to homepage</BackLink>
      </div>
    </div>
  </section>
</template>

<style lang="stylus" scoped>
.finish
  display: flex
  align-items: center
  justify-content: center

  &__salute
    width: 300px
    margin-bottom: 1.625rem

  &__order-id, &__desc
    font-size: 0.875rem
    font-weight: normal
    margin-bottom: 0.625rem

  &__order-id
    color: black

  &__backlink
    margin-top: 60px
</style>
