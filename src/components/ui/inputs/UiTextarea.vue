<script lang="ts" setup>
import { ref } from 'vue';
import UiIcon from '../icons/UiIcon.vue';

interface TextareaProps {
  placeholder?: string
  valid?: undefined | boolean
}

const props = withDefaults(defineProps<TextareaProps>(), { valid: undefined })

const isFocus = ref<boolean>(false)
const value = defineModel<string>()
</script>

<template>
  <div
    class="input"
    :class="{ 'input--valid': props.valid === true, 'input--invalid': props.valid === false }"
  >
    <div data-role="textarea">
      <textarea v-model="value" @focus="isFocus = true" @blur="isFocus = false" />
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
  </div>
</template>

<style lang="stylus" scoped>
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
</style>
