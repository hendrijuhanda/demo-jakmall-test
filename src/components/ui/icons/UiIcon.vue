<script lang="ts" setup>
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { MdChevronright } from 'oh-vue-icons/icons'

interface IconProps {
  name: string
}

addIcons(MdChevronright)

const props = defineProps<IconProps>()
</script>

<template>
  <OhVueIcon :name="props.name" />
</template>
