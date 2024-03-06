<script lang="ts" setup>
import UiCard from '@/components/ui/cards/UiCard.vue'
import StepIndicator from '@/components/views/checkout/StepIndicator.vue'

const stepIndicators = [
  { step: 'delivery', label: 'Delivery', active: true },
  { step: 'payment', label: 'Payment' },
  { step: 'finish', label: 'Finish' }
]
</script>

<template>
  <div class="checkout-page">
    <UiCard class="checkout-page__card">
      <StepIndicator class="checkout-page__step-indicator" :indicators="stepIndicators" />

      <header>
        <div></div>
      </header>
    </UiCard>
  </div>
</template>

<style lang="stylus" scoped>
@require '../assets/stylus/_variables.styl'

.checkout-page
  width: 100%
  height: 100vh
  background-color: bg-color
  display: flex
  align-items: center
  justify-content: center

  &__card
    width: 1100px
    height: 550px
    position: relative

  &__step-indicator
    position: absolute
    width: 100%
</style>
