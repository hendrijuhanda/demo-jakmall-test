<script lang="ts" setup>
import UiIcon from '@/components/ui/icons/UiIcon.vue';

export interface Indicator {
  step?: string
  label?: string
  active?: boolean
}

const props = defineProps<{ indicators: Indicator[] }>()
</script>

<template>
  <div class="step-indicator">
    <div class="step-indicator__inner">
      <div
        v-for="(indicator, index) in props.indicators"
        :key="index"
        class="step-indicator__item"
        :class="{ 'step-indicator__item--active': indicator.active }"
      >
        <div class="index">{{ index + 1 }}</div>
        <div class="label">{{ indicator.label }}</div>
        <div v-if="index !== props.indicators.length - 1" class="icon">
          <UiIcon name="md-chevronright" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@require '../../../assets/stylus/_variables.styl'

width = 500px
height = 70px
index-dimension = 1.875rem
icon-dimension = 1.5rem

.step-indicator
  display: flex
  justify-content: center
  pointer-events: none
  top: 'calc(-%s / 2)' % (height / 2)
  left: 0

  @media sm-breakpoint
    top: 'calc(-%s / 2)' % height

  &__inner
    width: auto
    height: (height / 2)
    padding: 0 1.25rem
    display: inline-flex
    align-items: center
    justify-content: center
    background-color: bg-color
    border-radius: 'calc(%s / 2)' % height
    box-sizing: border-box

    @media sm-breakpoint
      min-width: width
      height: height
      padding: 0 2.5rem

  &__item
    color: primary-color
    display: flex
    align-items: center

    .index
      width: (index-dimension * 0.75)
      height: (index-dimension * 0.75)
      background-color: rgba(primary-color, 20%)
      border-radius: 'calc(%s / 2)' % index-dimension
      display: flex
      align-items: center
      justify-content: center
      margin-right: 0.625rem

      @media sm-breakpoint
        width: index-dimension
        height: index-dimension

    .icon
      width: icon-dimension
      height: icon-dimension
      display: flex
      align-items: center
      justify-content: center
      margin: 0 0.5rem

      @media sm-breakpoint
        margin: 0 1.25rem

    .label
      display: block
      font-size: 0.825rem

      @media sm-breakpoint
        font-size: inherit

    &--active
      .index
        color: white
        background-color: primary-color
        margin-right: 0.625rem
</style>
