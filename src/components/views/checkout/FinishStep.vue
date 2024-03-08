<script lang="ts" setup>
import { useCheckoutStore } from '@/stores/checkout'
import randomString from '@/utils/random-string'
import { storeToRefs } from 'pinia'
import { computed, onUnmounted } from 'vue'
import UiTextDecorated from '../../ui/typos/UiTextDecorated.vue'
import BackLink from './BackLink.vue'

interface FinishStepProps {
  shipmentData: any
}

const props = defineProps<FinishStepProps>()

const checkoutStore = useCheckoutStore()
const { reset } = checkoutStore
const { deliveryDetails } = storeToRefs(checkoutStore)

const selectedShipment = computed(() => props.shipmentData[deliveryDetails.value.shipment])

onUnmounted(() => {
  reset()
})
</script>

<template>
  <section class="finish">
    <div>
      <UiTextDecorated tag="h2" class="finish__salute"> Thank You </UiTextDecorated>

      <div>
        <div class="finish__order-id">Order ID: {{ randomString(5, ['1', 'I', '0', 'O']) }}</div>
        <div class="finish__desc">
          Your order will be delivered {{ deliveryDetails.shipment !== 'go-send' ? 'within ' : ''
          }}{{ selectedShipment.estimation.toLowerCase() }} with
          {{ selectedShipment.label }}
        </div>
      </div>

      <div class="finish__backlink">
        <BackLink to="/">Go to homepage</BackLink>
      </div>
    </div>
  </section>
</template>

<style lang="stylus" scoped>
@require '../../../assets/stylus/_variables.styl'

.finish
  @media xl-breakpoint
    display: flex
    align-items: center
    justify-content: center

  &__salute
    width: 300px
    max-width: 100%
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
