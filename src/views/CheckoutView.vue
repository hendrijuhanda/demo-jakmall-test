<script lang="ts" setup>
import UiCard from '@/components/ui/cards/UiCard.vue'
import BackLink from '@/components/views/checkout/BackLink.vue'
import CheckoutSummary from '@/components/views/checkout/CheckoutSummary.vue'
import DeliveryStep from '@/components/views/checkout/DeliveryStep.vue'
import FinishStep from '@/components/views/checkout/FinishStep.vue'
import PaymentStep from '@/components/views/checkout/PaymentStep.vue'
import StepIndicator, { type Indicator } from '@/components/views/checkout/StepIndicator.vue'
import { useCheckoutStore } from '@/stores/checkout'
import priceFormat from '@/utils/price-format'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'

const shipments = {
  'go-send': { cost: 15000, estimation: 'Today', label: 'GO-SEND' },
  jne: { cost: 9000, estimation: '2 days', label: 'JNE' },
  'personal-courier': { cost: 29000, estimation: '1 day', label: 'Personal Courier' }
}

const payments = {
  'e-wallet': { label: 'e-Wallet', content: `${priceFormat(1500000)} left` },
  'bank-transfer': { label: 'Bank Transfer', content: 'Bank Transfer' },
  va: { label: 'Virtual Account', content: 'Virtual Account' }
}

const stepIndicators = ref<Indicator[]>([
  { step: 'delivery', label: 'Delivery' },
  { step: 'payment', label: 'Payment' },
  { step: 'finish', label: 'Finish' }
])

const deliveryStepRef = ref()
const paymentStepRef = ref()
const checkoutStore = useCheckoutStore()
const { setStep, reset } = checkoutStore
const { step } = storeToRefs(checkoutStore)
const backLink = computed(() => {
  if (step.value === 1) {
    return { to: '/', label: 'Back to Cart' }
  } else if (step.value === 2) {
    return { to: undefined, label: 'Back to delivery' }
  }

  return {}
})

const handleSummaryBtn = () => {
  if (deliveryStepRef.value && step.value === 1) {
    const { errors } = deliveryStepRef.value.validate()

    if (!errors.length) {
      setStep(2)
    }
  }

  if (paymentStepRef.value && step.value === 2) {
    const valid = paymentStepRef.value.validate()

    if (valid) {
      setStep(3)
    }
  }
}

onMounted(() => {
  if (step.value === 3) {
    reset()
  }
})

watch(
  step,
  (val: number) => {
    for (let i = 0; i < stepIndicators.value.length; i++) {
      stepIndicators.value[i] = { ...stepIndicators.value[i], active: val - 1 >= i }
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="checkout-page">
    <UiCard class="checkout-page__card">
      <StepIndicator class="checkout-page__step-indicator" :indicators="stepIndicators" />

      <header
        class="checkout-page__header"
        :class="{ 'checkout-page__header--invisible': step === 3 }"
      >
        <BackLink :to="backLink.to" @click="step === 2 ? setStep(1) : undefined">{{
          backLink.label
        }}</BackLink>
      </header>

      <main class="checkout-page__main">
        <DeliveryStep v-if="step === 1" ref="deliveryStepRef" class="checkout-page__step" />

        <PaymentStep
          v-if="step === 2"
          ref="paymentStepRef"
          class="checkout-page__step"
          :shipment-data="shipments"
          :payment-data="payments"
        />

        <FinishStep v-if="step === 3" class="checkout-page__step" :shipment-data="shipments" />

        <CheckoutSummary
          class="checkout-page__summary"
          :shipment-data="shipments"
          :payment-data="payments"
          @button-click="handleSummaryBtn"
        />
      </main>
    </UiCard>
  </div>
</template>

<style lang="stylus" scoped>
@require '../assets/stylus/_variables.styl'

.checkout-page
  width: 100%
  min-height: 100vh
  background-color: bg-color
  display: flex
  align-items: start
  justify-content: center
  padding: 1rem
  box-sizing: border-box

  @media xl-breakpoint
    align-items: center

  &__card
    width: 1100px
    height: auto
    min-height: 550px
    max-width: 100%
    position: relative
    display: flex
    flex-direction: column
    box-sizing: border-box
    margin: 2rem auto

  &__step-indicator
    position: absolute
    width: 100%

  &__header
    margin-bottom: 1.5rem
    padding-top: 2rem

    @media xl-breakpoint
      padding: 0.625rem 0 0 1.25rem

    &--invisible
      visibility: hidden

  &__main
    display: block

    @media xl-breakpoint
      display: flex
      flex-grow: 1
      align-items: stretch

  &__step
    margin-bottom: 1.25rem
    padding-bottom: 1.25rem
    border-bottom: 1px solid rgba(primary-color, 20%)

    @media xl-breakpoint
      margin-bottom: 0
      padding-bottom: 0
      border-bottom: none
      margin-left: 1.25rem
      padding-right: 1.25rem
      flex-grow: 1
      border-right: 1px solid rgba(primary-color, 20%)

  &__summary
    flex-shrink: 0
</style>
