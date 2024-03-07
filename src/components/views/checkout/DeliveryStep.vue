<script lang="ts" setup>
import UiTextarea from '@/components/ui/inputs/UiTextarea.vue';
import UiCheckbox from '../../ui/inputs/UiCheckbox.vue';
import UiInput from '../../ui/inputs/UiInput.vue';
import UiTextDecorated from '../../ui/typos/UiTextDecorated.vue';
</script>

<template>
  <section class="delivery">
    <div class="delivery__header">
      <UiTextDecorated tag="h2"> Delivery details </UiTextDecorated>

      <div class="delivery__checkbox">
        <UiCheckbox label="Send as dropshipper" />
      </div>
    </div>

    <div class="delivery__inputs">
      <UiInput placeholder="Name" :valid="false" />
      <UiInput placeholder="Dropshipper name" :valid="true" />
      <UiInput placeholder="Phone number" />
      <UiInput placeholder="Dropshipper phone number" />
      <UiTextarea placeholder="Delivery address" class="address" :valid="true" />
    </div>
  </section>
</template>

<style lang="stylus" scoped>
.delivery
  &__header
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 2.25rem

  &__checkbox
    margin-right: 2.5rem

  &__inputs
    display: grid
    grid-template-columns: 400px 300px
    grid-template-rows: repeat(2, 1fr)
    grid-column-gap: 1.875rem
    grid-row-gap: 0.625rem

    .address
      height: 120px
</style>
