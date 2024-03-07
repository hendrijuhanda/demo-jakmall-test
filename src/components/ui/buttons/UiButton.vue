<script lang="ts" setup>
interface ButtonProps {
  color?: 'primary'
  block?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'primary'
})
</script>

<template>
  <button type="button" class="btn" :class="[{ 'btn--block': props.block }, `btn--${props.color}`]">
    <slot />
  </button>
</template>

<style lang="stylus" scoped>
@require '../../../assets/stylus/_variables.styl'
@require '../../../assets/stylus/_funcs.styl'

.btn
    padding: 1.25rem 1.875rem
    border: 0
    background-color: transparent
    font-weight: 600
    font-size: 1.125rem
    cursor: pointer
    transition: background-color 0.2s ease-out
    box-sizing: border-box

    &--block
        display: block
        width: 100%

button-theme('primary', primary-color, white)
</style>
