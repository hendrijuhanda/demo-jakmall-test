<script lang="ts" setup>
import { ref } from 'vue';
import UiIcon from '../icons/UiIcon.vue';

interface InputProps {
  placeholder?: string
  valid?: undefined | boolean
}

const props = withDefaults(defineProps<InputProps>(), { valid: undefined })

const isFocus = ref<boolean>(false)
const value = defineModel<string>()
</script>

<template>
  <div
    class="input"
    :class="{ 'input--valid': props.valid === true, 'input--invalid': props.valid === false }"
  >
    <input type="text" v-model="value" @focus="isFocus = true" @blur="isFocus = false" />
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

input-general-style('input', 'input', 1.25rem)
</style>
