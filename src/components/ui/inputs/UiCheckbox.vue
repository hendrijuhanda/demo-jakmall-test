<script lang="ts" setup>
import { ref } from 'vue';
import UiIcon from '../icons/UiIcon.vue';

interface CheckboxProps {
  label?: string
}

const props = defineProps<CheckboxProps>()

const checked = ref<boolean>(false)
</script>

<template>
  <div class="checkbox">
    <label>
      <input type="checkbox" v-model="checked" />
      <div class="checkbox__tick" :class="{ 'checkbox__tick--active': checked }">
        <UiIcon v-if="checked" class="icon" name="md-done" />
      </div>
      <div class="checkbox__label">{{ props.label }}</div>
    </label>
  </div>
</template>

<style lang="stylus" scoped>
.checkbox
    & > label
        display: flex
        align-items: center
        position: relative
        cursor: pointer

        & > input[type='checkbox']
            position: absolute
            top: 0
            left: 0
            opacity: 0
            pointer-events: none

    &__tick
        display: inline-flex
        align-items: center
        justify-content: center
        width: 1.125rem
        height: 1.125rem
        box-sizing: border-box
        border: 1px solid #cccccc
        margin-right: 0.625rem

        .icon
            width: 1.125rem
            height: 1.125rem

        &--active
            border-color: #1BD97B
            color: #1BD97B

    &__label
        font-size: 0.875rem
</style>
