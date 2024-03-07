<script lang="ts" setup>
interface TextDecoratedProps {
  tag?: string
}

const props = withDefaults(defineProps<TextDecoratedProps>(), {
  tag: 'div'
})
</script>

<template>
  <component :is="props.tag" class="text">
    <slot />
  </component>
</template>

<style lang="stylus" scoped>
@require '../../../assets/stylus/_variables.styl'
@require '../../../assets/stylus/_funcs.styl'

.text
    font-Montserrat()
    font-size: 2.25rem
    font-weight: 700
    color: primary-color
    position: relative
    z-index: 1
    display: inline-block

    &:before
        content: ''
        position: absolute
        bottom: 0
        left: 0
        z-index: -1
        width: 100%
        height: 0.5rem
        background-color: #eeeeee
</style>
