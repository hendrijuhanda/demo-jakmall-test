<script lang="ts" setup>
import { computed, ref } from 'vue';
import UiIcon from '../icons/UiIcon.vue';

interface TextareaProps {
  placeholder?: string
  valid?: undefined | boolean
  disabled?: boolean
  innerClass?: any
  error?: string | null
  limit?: number
}

const props = withDefaults(defineProps<TextareaProps>(), { valid: undefined })

const isFocus = ref<boolean>(false)
const value = defineModel<string>('value')

const currentLength = computed(() => value?.value?.length || 0)

const handleInput = ($event: Event) => {
  const { value: val } = $event.target as HTMLTextAreaElement

  value.value = props.limit && val.length >= props.limit ? val.substring(0, props.limit) : val
}
</script>

<template>
  <div
    class="input"
    :class="{
      'input--valid': props.valid === true,
      'input--invalid': props.valid === false,
      'input--disabled': props.disabled,
      'input--limit': props.limit
    }"
  >
    <div class="input__inner" :class="props.innerClass">
      <div data-role="textarea">
        <textarea
          v-model="value"
          @focus="isFocus = true"
          @blur="isFocus = false"
          @input="handleInput"
          :disabled="props.disabled"
        />
      </div>

      <div
        v-if="props.placeholder"
        class="input__placeholder"
        :class="{ 'input__placeholder--raised': isFocus || value }"
      >
        {{ props.placeholder }}
      </div>

      <div v-if="props.valid !== undefined">
        <div class="input__icon">
          <UiIcon v-if="props.valid === true" class="icon" name="md-done" />
          <UiIcon v-if="props.valid === false" class="icon" name="md-close" />
        </div>
      </div>

      <div v-if="props.limit">
        <div class="input__limit">
          {{ `${currentLength}/${props.limit}` }}
        </div>
      </div>
    </div>

    <div v-if="props.error" class="input__error">{{ props.error }}</div>
  </div>
</template>

<style lang="stylus" scoped>
@require '../../../assets/stylus/_variables.styl'
@require '../../../assets/stylus/_funcs.styl'

input-general-style('input', 'div[data-role="textarea"]', 1.25rem)

.input
  div[data-role='textarea']
    height: 100%
    min-height: 60px

    textarea
      font-Inter-UI()
      border: 0
      outline: none !important
      width: 100%
      height: 100%
      color: black
      font-weight: 700
      font-size: 1rem
      padding: 0
      resize: none

      &[disabled]
        background-color: input-disabled-color

  &__limit
    position: absolute
    bottom: 0.875rem
    right: 0.875rem
    pointer-events: none
    font-size: 0.875rem
    color: text-color-3
    font-weight: normal

  &--limit
    div[data-role='textarea']
      padding-bottom: 2.75rem

  &--disabled
    div[data-role='textarea']
      cursor: default
      background-color: input-disabled-color
</style>
