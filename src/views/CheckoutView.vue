<script lang="ts" setup>
import UiCard from '@/components/ui/cards/UiCard.vue'
import StepIndicator from '@/components/views/checkout/StepIndicator.vue'
import DeliveryStep from '@/components/views/checkout/DeliveryStep.vue'
import CheckoutSummary from '@/components/views/checkout/CheckoutSummary.vue'
import BackLink from '@/components/views/checkout/BackLink.vue'

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

      <header class="checkout-page__header">
        <BackLink to="/">Back to Cart</BackLink>
      </header>

      <main class="checkout-page__main">
        <DeliveryStep class="checkout-page__step" />
        <CheckoutSummary class="checkout-page__summary" />
      </main>
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
    display: flex
    flex-direction: column

  &__step-indicator
    position: absolute
    width: 100%

  &__header
    margin-bottom: 1.5rem
    padding: 0.625rem 0 0 1.25rem

  &__main
    display: flex
    flex-grow: 1
    align-items: stretch

  &__step
    margin: 0.625rem 0 0 1.25rem
    flex-grow: 1

  &__summary
    flex-shrink: 0
</style>
