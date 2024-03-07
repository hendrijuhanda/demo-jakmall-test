<script lang="ts" setup>
import UiButton from '../../ui/buttons/UiButton.vue'
</script>

<template>
  <section class="summary">
    <div class="summary__top">
      <div>
        <h3 class="summary__title">Summary</h3>
        <div class="summary__count">10 items purchased</div>
      </div>

      <div class="summary__shipment">
        <div>Delivery Estimation</div>
        <div>Today by GO-SEND</div>
      </div>

      <div class="summary__payment">
        <div>Payment Method</div>
        <div>Bank Transfer</div>
      </div>
    </div>

    <div class="summary__bottom">
      <div>
        <div class="summary__cost">
          <div>Cost of goods</div>
          <div><b>500,000</b></div>
        </div>

        <div class="summary__dropship-fee">
          <div>Dropshipping Fee</div>
          <div><b>5,900</b></div>
        </div>

        <div class="summary__shipment-cost">
          <div><b>GO-SEND</b> shipment</div>
          <div><b>5,900</b></div>
        </div>
      </div>

      <div class="summary__total">
        <div>Total</div>
        <div>505900</div>
      </div>
    </div>

    <div>
      <UiButton color="primary" block>Pay with e-wallet</UiButton>
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
      color: #1BD97B

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
