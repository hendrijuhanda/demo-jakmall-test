<script lang="ts" setup>
import UiTextDecorated from '../../ui/typos/UiTextDecorated.vue'
import UiIcon from '../../ui/icons/UiIcon.vue'

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
.select-option
    width: 560px

    &__title
        width: 300px
        margin-bottom: 1.875rem

    &__items
        display: grid
        grid-template-columns: repeat(3, 1fr)
        gap: 0.625rem

    &__item
        box-sizing: border-box
        padding: 0.75rem 0.875rem
        border: 1px solid #cccccc
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
            color: #1BD97B

        &--active
            background-color: rgba(#1BD97B, 10%)
            border-color: #1BD97B
</style>
