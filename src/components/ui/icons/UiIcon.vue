<script lang="ts" setup>
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { MdChevronright, MdArrowback } from 'oh-vue-icons/icons'

interface IconProps {
  name: string
}

addIcons(MdChevronright, MdArrowback)

const props = defineProps<IconProps>()
</script>

<template>
  <OhVueIcon :name="props.name" />
</template>
