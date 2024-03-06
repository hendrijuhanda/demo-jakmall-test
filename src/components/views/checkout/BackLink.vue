<script lang="ts" setup>
import UiIcon from '../../ui/icons/UiIcon.vue'

interface BackLinkProps {
  to: string
}

const props = defineProps<BackLinkProps>()
</script>

<template>
  <RouterLink :to="props.to" class="link">
    <div class="link__inner">
      <div class="link__icon">
        <UiIcon name="md-arrowback" />
      </div>
      <div>
        <slot />
      </div>
    </div>
  </RouterLink>
</template>

<style lang="stylus" scoped>
@require '../../../assets/stylus/_variables.styl'

.link
    display: inline-block
    font-weight: normal
    font-size: 0.875rem
    text-decoration: none
    color: rgba(black, 60%)
    transition: color 0.2s ease-out

    &__inner
        display: inline-flex
        align-items: center

    &__icon
        dimension = 1.125rem
        display: flex
        align-items: center
        justify-content: center
        margin-right: 0.625rem

        & > *
            width: dimension
            height: dimension

    &:hover
        color: primary-color
</style>
