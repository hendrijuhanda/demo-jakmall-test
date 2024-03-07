<script lang="ts" setup>
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { MdArrowback, MdChevronright, MdClose, MdDone } from 'oh-vue-icons/icons';

interface IconProps {
  name: string
}

addIcons(MdChevronright, MdArrowback, MdDone, MdClose)

const props = defineProps<IconProps>()
</script>

<template>
  <OhVueIcon :name="props.name" />
</template>
