<script lang="ts" setup>
import UiCheckbox from '@/components/ui/inputs/UiCheckbox.vue'
import UiInput from '@/components/ui/inputs/UiInput.vue'
import UiTextarea from '@/components/ui/inputs/UiTextarea.vue'
import UiTextDecorated from '@/components/ui/typos/UiTextDecorated.vue'
import { useCheckoutStore } from '@/stores/checkout'
import validator, { type RuleOptions } from '@/utils/validator'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'

const checkoutStore = useCheckoutStore()
const { setStep, setDeliveryDetails } = checkoutStore
const { deliveryDetails } = storeToRefs(checkoutStore)

const inputs = ref<any>({
  dropshipper: { checked: false },
  name: { value: '' },
  dropshipperName: { value: '' },
  phoneNumber: { value: '' },
  dropshipperPhoneNumber: { value: '' },
  deliveryAddress: { value: '' }
})

const validate = () => {
  Object.entries(inputs.value)
    .filter(([key]) => key !== 'dropshipper')
    .forEach((entry) => {
      const [key, value] = entry

      inputs.value[key] = { value: (value as any)?.value || '' }
    })

  const phoneRegex = /^(08|\+62)[\d\-,+]{4,18}$/

  const phoneRegexMatch = (_key: string, val: any, opts?: RuleOptions) => {
    if (!phoneRegex.test(val))
      return `Invalid ${(
        opts?.label || ''
      ).toLowerCase()}! Must be contain only number, hypen (-), plus (+), comma (,), min 6, max 20 and started with 08 or +62.`

    return null
  }

  const schema = validator.schema({
    name: validator.createRules(['required'], { label: 'Name' }),
    dropshipperName: validator.createRules(['required'], { label: 'Dropshipper name' }),
    phoneNumber: validator.createRules(
      [
        'required',
        {
          rule: 'phone-number',
          handler: phoneRegexMatch
        }
      ],
      { label: 'Phone number' }
    ),
    dropshipperPhoneNumber: validator.createRules(
      [
        'required',
        {
          rule: 'phone-number',
          handler: phoneRegexMatch
        }
      ],
      { label: 'Dropshipper phone number' }
    ),
    deliveryAddress: validator.createRules(['required'], { label: 'Delivery address' })
  })

  let objects: any = {
    name: inputs.value.name.value,
    phoneNumber: inputs.value.phoneNumber.value,
    deliveryAddress: inputs.value.deliveryAddress.value
  }

  if (inputs.value.dropshipper.checked) {
    objects = {
      ...objects,
      dropshipperName: inputs.value.dropshipperName.value,
      dropshipperPhoneNumber: inputs.value.dropshipperPhoneNumber.value
    }
  }

  const { errors, valids } = schema.validate(objects)

  if (errors.length) {
    errors.forEach((error) => {
      inputs.value[error.key] = {
        ...inputs.value[error.key],
        valid: false,
        error: error.messages[0].message
      }
    })
  }

  if (valids.length) {
    valids.forEach((valid) => {
      inputs.value[valid.key] = { ...inputs.value[valid.key], valid: true }
    })
  }

  return { errors, valids }
}

const syncDetails = () => {
  Object.entries(deliveryDetails.value).forEach(([key, value]) => {
    if (key === 'dropshipper') {
      inputs.value[key] = { checked: value }
    } else {
      inputs.value[key] = { value: value }
    }
  })
}

defineExpose({ validate })

onMounted(() => {
  setStep(1)
  syncDetails()
})

watch(
  () => inputs.value.dropshipper.checked,
  (val: boolean) => {
    if (!val) {
      inputs.value.dropshipperName = { value: '' }
      inputs.value.dropshipperPhoneNumber = { value: '' }
    }
  }
)

watch(
  inputs,
  (val: any) => {
    const details = {
      dropshipper: val.dropshipper.checked,
      name: val.name.value,
      phoneNumber: val.phoneNumber.value,
      deliveryAddress: val.deliveryAddress.value,
      dropshipperName: val.dropshipperName.value,
      dropshipperPhoneNumber: val.dropshipperPhoneNumber.value
    }

    setDeliveryDetails({ ...deliveryDetails.value, ...details })
  },
  { deep: true }
)
</script>

<template>
  <section class="delivery">
    <div class="delivery__header">
      <UiTextDecorated tag="h2"> Delivery details </UiTextDecorated>

      <div class="delivery__checkbox">
        <UiCheckbox v-model:checked="inputs.dropshipper.checked" label="Send as dropshipper" />
      </div>
    </div>

    <div class="delivery__inputs">
      <UiInput
        v-model:value="inputs.name.value"
        placeholder="Name"
        :valid="inputs.name.valid"
        :error="inputs.name.error"
      />

      <UiInput
        v-model:value="inputs.dropshipperName.value"
        placeholder="Dropshipper name"
        :disabled="!inputs.dropshipper.checked"
        :valid="inputs.dropshipperName.valid"
        :error="inputs.dropshipperName.error"
      />

      <UiInput
        v-model:value="inputs.phoneNumber.value"
        placeholder="Phone number"
        :valid="inputs.phoneNumber.valid"
        :error="inputs.phoneNumber.error"
      />

      <UiInput
        v-model:value="inputs.dropshipperPhoneNumber.value"
        placeholder="Dropshipper phone number"
        :disabled="!inputs.dropshipper.checked"
        :valid="inputs.dropshipperPhoneNumber.valid"
        :error="inputs.dropshipperPhoneNumber.error"
      />

      <UiTextarea
        v-model:value="inputs.deliveryAddress.value"
        placeholder="Delivery address"
        inner-class="address"
        :limit="120"
        :valid="inputs.deliveryAddress.valid"
        :error="inputs.deliveryAddress.error"
      />
    </div>
  </section>
</template>

<style lang="stylus" scoped>
@require '../../../assets/stylus/_variables.styl'

.delivery
  &__header
    margin-bottom: 2.25rem

    @media xl-breakpoint
      display: flex
      justify-content: space-between
      align-items: center

  &__checkbox
    margin-top: 2.5rem

    @media xl-breakpoint
      margin-top: 0
      margin-right: 2.5rem

  &__inputs
    display: grid
    grid-template-columns: 100%
    grid-template-rows: repeat(2, 1fr)
    grid-column-gap: 1.875rem
    grid-row-gap: 0.625rem

    & > *
      &:nth-child(2)
        order: 4

      &:nth-child(4)
        order: 5

    @media xl-breakpoint
      grid-template-columns: 400px 300px

      & > *
        order: 0 !important
</style>

<style lang="stylus">
.delivery__inputs .address
  height: 120px
</style>
