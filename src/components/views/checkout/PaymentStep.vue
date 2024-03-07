<script lang="ts" setup>
import { useCheckoutStore } from '@/stores/checkout'
import priceFormat from '@/utils/price-format'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import SelectOption from './SelectOption.vue'

interface PaymentStepProps {
  shipmentData: any
  paymentData: any
}

const props = defineProps<PaymentStepProps>()
const checkoutStore = useCheckoutStore()
const { setDeliveryDetails } = checkoutStore
const { deliveryDetails } = storeToRefs(checkoutStore)

const shipmentItems = ref<any>([
  {
    key: 'go-send',
    label: props.shipmentData['go-send'].label,
    content: priceFormat(props.shipmentData['go-send'].cost)
  },
  {
    key: 'jne',
    label: props.shipmentData['jne'].label,
    content: priceFormat(props.shipmentData['jne'].cost)
  },
  {
    key: 'personal-courier',
    label: props.shipmentData['personal-courier'].label,
    content: priceFormat(props.shipmentData['personal-courier'].cost)
  }
])

const paymentItems = ref<any>([
  {
    key: 'e-wallet',
    label: props.paymentData['e-wallet'].label,
    content: props.paymentData['e-wallet'].content
  },
  { key: 'bank-transfer', content: props.paymentData['bank-transfer'].content },
  { key: 'va', content: props.paymentData['va'].content }
])

const shipmentError = ref<string>('')
const paymentError = ref<string>('')

const selectedShipment = computed(() => shipmentItems.value.find((item: any) => item.active))
const selectedPayment = computed(() => paymentItems.value.find((item: any) => item.active))

const handleSelect = (mode: 'shipment' | 'payment', $event: any) => {
  if (mode === 'shipment') {
    shipmentItems.value.forEach((item: any, index: number) => {
      shipmentItems.value[index] = { ...item, active: item.key === $event.key }
    })

    setDeliveryDetails({ ...deliveryDetails.value, shipment: $event.key })
  }

  if (mode === 'payment') {
    paymentItems.value.forEach((item: any, index: number) => {
      paymentItems.value[index] = { ...item, active: item.key === $event.key }
    })

    setDeliveryDetails({ ...deliveryDetails.value, payment: $event.key })
  }
}

const validate = () => {
  shipmentError.value = !selectedShipment.value ? 'Please select shipment!' : ''
  paymentError.value = !selectedPayment.value ? 'Please select payment method!' : ''

  return selectedShipment.value && selectedPayment.value
}

defineExpose({ validate })

onMounted(() => {
  handleSelect('shipment', { key: deliveryDetails.value.shipment })
  handleSelect('payment', { key: deliveryDetails.value.payment })
})

watch(selectedShipment, (val: any) => {
  if (val) shipmentError.value = ''
})

watch(selectedPayment, (val: any) => {
  if (val) paymentError.value = ''
})
</script>

<template>
  <section class="select-option">
    <div class="select-option__shipment">
      <SelectOption
        title="Shipment"
        :items="shipmentItems"
        @select="handleSelect('shipment', $event)"
      />

      <div v-if="shipmentError" class="select-option__error">{{ shipmentError }}</div>
    </div>

    <div class="select-option__payment">
      <SelectOption
        title="Payment"
        :items="paymentItems"
        @select="handleSelect('payment', $event)"
      />

      <div v-if="paymentError" class="select-option__error">{{ paymentError }}</div>
    </div>
  </section>
</template>

<style lang="stylus" scoped>
@require '../../../assets/stylus/_variables.styl'

.select-option
  &__shipment
    margin-bottom: 60px

  &__error
    color: input-error-color
    font-size: 0.875rem
    margin-top: 0.25rem
</style>
