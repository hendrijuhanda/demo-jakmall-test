<script lang="ts" setup>
import UiIcon from '../../ui/icons/UiIcon.vue';
import UiTextDecorated from '../../ui/typos/UiTextDecorated.vue';

interface SelectOptionItem {
  key?: string
  label?: string
  content?: any
  active?: boolean
}

interface SelectOptionProps {
  title: string
  items: SelectOptionItem[]
}

const props = defineProps<SelectOptionProps>()
const emit = defineEmits(['select'])
</script>

<template>
  <section class="select-option">
    <UiTextDecorated tag="h2" class="select-option__title">{{ props.title }}</UiTextDecorated>

    <div class="select-option__items">
      <div
        v-for="(item, index) in props.items"
        :key="index"
        class="select-option__item"
        :class="{ 'select-option__item--active': item.active }"
        @click="emit('select', item)"
      >
        <div class="inner">
          <div class="label">{{ item.label }}</div>
          <div class="content">{{ item.content }}</div>
        </div>

        <div v-if="item.active" class="icon">
          <UiIcon name="md-done" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="stylus" scoped>
@require '../../../assets/stylus/_variables.styl'

.select-option
  width: 560px
  max-width: 100%

  &__title
    width: 300px
    max-width: 100%
    margin-bottom: 1.875rem

  &__items
    display: grid
    grid-template-columns: repeat(3, 1fr)
    gap: 0.625rem

  &__item
    box-sizing: border-box
    padding: 0.75rem 0.875rem
    border: 1px solid input-border-color
    cursor: pointer
    display: flex
    align-items: center
    justify-content: space-between

    .inner
      display: flex
      flex-direction: column
      justify-content: center

    .label
      font-size: 0.875rem
      margin-bottom: 0.125rem

    .content
      font-weight: 700

    .icon
      color: success-color
      margin-left: 0.875rem

    &--active
      background-color: rgba(success-color, 10%)
      border-color: success-color
</style>
