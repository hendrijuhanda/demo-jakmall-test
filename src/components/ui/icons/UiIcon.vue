<script lang="ts" setup>
import { OhVueIcon } from 'oh-vue-icons'

interface IconProps {
  name: string
}

const props = defineProps<IconProps>()
</script>

<template>
  <OhVueIcon :name="props.name" />
</template>
