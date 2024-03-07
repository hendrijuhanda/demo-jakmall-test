<script lang="ts" setup>
import { RouterLink } from 'vue-router';

interface ButtonProps {
  color?: 'primary'
  block?: boolean
  to?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'primary'
})
</script>

<template>
  <template v-if="props.to">
    <RouterLink
      v-bind="$attrs"
      :to="props.to"
      class="btn"
      :class="[{ 'btn--block': props.block }, `btn--${props.color}`]"
    >
      <slot />
    </RouterLink>
  </template>

  <template v-else>
    <button
      v-bind="$attrs"
      type="button"
      class="btn"
      :class="[{ 'btn--block': props.block }, `btn--${props.color}`]"
    >
      <slot />
    </button>
  </template>
</template>

<style lang="stylus" scoped>
@require '../../../assets/stylus/_variables.styl'
@require '../../../assets/stylus/_funcs.styl'

.btn
  padding: 1.25rem 1.875rem
  border: 0
  background-color: transparent
  font-weight: 500
  font-size: 1.125rem
  cursor: pointer
  transition: background-color 0.2s ease-out
  box-sizing: border-box
  text-decoration: none

  &--block
    display: block
    width: 100%

button-theme('primary', primary-color, white)
</style>
