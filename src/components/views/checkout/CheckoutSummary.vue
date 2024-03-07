<script lang="ts" setup>
import UiButton from '@/components/ui/buttons/UiButton.vue'
import { useCheckoutStore } from '@/stores/checkout'
import priceFormat from '@/utils/price-format'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

interface CheckoutSummaryProps {
  shipmentData: any
  paymentData: any
}

const props = defineProps<CheckoutSummaryProps>()
const emit = defineEmits(['button-click'])

const checkoutStore = useCheckoutStore()
const { step, deliveryDetails } = storeToRefs(checkoutStore)

const selectedShipment = computed(() => props.shipmentData[deliveryDetails.value.shipment])
const selectedPayment = computed(() => props.paymentData[deliveryDetails.value.payment])
const goodsCost = ref<number>(500000)
const dropshippingFee = computed(() => (deliveryDetails.value.dropshipper ? 5900 : 0))
const total = computed(
  () => goodsCost.value + dropshippingFee.value + (selectedShipment.value?.cost || 0)
)
const buttonLabel = computed(() => {
  if (step.value === 1) {
    return 'Continue to Payment'
  } else if (step.value === 2 && selectedPayment.value) {
    return `Pay with ${selectedPayment.value.label}`
  } else {
    return 'Continue'
  }
})
</script>

<template>
  <section class="summary">
    <div class="summary__top">
      <div>
        <h3 class="summary__title">Summary</h3>
        <div class="summary__count">10 items purchased</div>
      </div>

      <div v-if="step >= 2 && deliveryDetails.shipment" class="summary__shipment">
        <div>Delivery Estimation</div>
        <div>{{ `${selectedShipment.estimation} by ${selectedShipment.label}` }}</div>
      </div>

      <div v-if="step >= 2 && deliveryDetails.payment" class="summary__payment">
        <div>Payment Method</div>
        <div>{{ selectedPayment.label }}</div>
      </div>
    </div>

    <div class="summary__bottom">
      <div>
        <div class="summary__cost">
          <div>Cost of goods</div>
          <div>
            <b>{{ priceFormat(goodsCost) }}</b>
          </div>
        </div>

        <div class="summary__dropship-fee">
          <div>Dropshipping Fee</div>
          <div>
            <b>{{ dropshippingFee ? priceFormat(dropshippingFee) : '-' }}</b>
          </div>
        </div>

        <div v-if="step >= 2 && deliveryDetails.shipment" class="summary__shipment-cost">
          <div>
            <b>{{ selectedShipment.label }}</b> shipment
          </div>
          <div>
            <b>{{ priceFormat(selectedShipment.cost) }}</b>
          </div>
        </div>
      </div>

      <div class="summary__total">
        <div>Total</div>
        <div>{{ priceFormat(total) }}</div>
      </div>
    </div>

    <div v-if="step !== 3">
      <UiButton color="primary" block @click="emit('button-click')">{{ buttonLabel }}</UiButton>
    </div>
  </section>
</template>

<style lang="stylus" scoped>
@require '../../../assets/stylus/_variables.styl'
@require '../../../assets/stylus/_funcs.styl'

.summary
  width: 280px
  display: flex
  flex-direction: column
  padding-left: 1.25rem
  box-sizing: border-box

  &__top
    flex-grow: 1

  &__title
    font-Montserrat()
    font-size: 1.5rem
    color: primary-color
    font-weight: 700
    margin-bottom: 0.625rem

  &__shipment, &__payment
    box-sizing: border-box
    margin-top: 1.25rem
    padding-top: 1.25rem
    position: relative

    &:before
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 80px
      height: 1px
      background-color: #d8d8d8

    & > div:first-child
      color: black
      font-weight: normal
      font-size: 0.875rem
      margin-bottom: 0.25rem

    & > div:nth-child(2)
      color: success-color

  &__count
    font-weight: normal
    font-size: 0.875rem

  &__cost, &__dropship-fee, &__shipment-cost, &__total
    font-weight: normal
    font-size: 0.875rem
    display: flex
    justify-content: space-between
    margin-bottom: 0.625rem

    b
      font-weight: 700
      color: black

  &__shipment-cost
    & > div:first-child b
      color: inherit

  &__total
    font-Montserrat()
    color: primary-color
    font-weight: 700
    font-size: 1.5rem
    margin-top: 1.5rem

  &__bottom
    margin-bottom: 1.875rem
</style>
