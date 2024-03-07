<script lang="ts" setup>
import SelectOption from './SelectOption.vue'

const shipmentItems = [
  { key: 'go-send', label: 'GO-SEND', content: 15000, active: true },
  { key: 'jne', label: 'JNE', content: 9000 },
  { key: 'personal-courier', label: 'Personal Courier', content: 29000 }
]

const paymentItems = [
  { key: 'e-wallet', label: 'e-Wallet', content: '1500000 left', active: true },
  { key: 'bank-transfer', content: 'Bank Transfer' },
  { key: 'va', content: 'Virtual Account' }
]
</script>

<template>
  <section class="select-option">
    <SelectOption class="select-option__shipment" title="Shipment" :items="shipmentItems" />
    <SelectOption class="select-option__payment" title="Payment" :items="paymentItems" />
  </section>
</template>

<style lang="stylus" scoped>
.select-option
    &__shipment
        margin-bottom: 60px
</style>
