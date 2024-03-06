<template>
  <div class="card">
    <slot />
  </div>
</template>

<style lang="stylus" scoped>
@require '../../../assets/stylus/_variables.styl'

.card
  background-color: white
  border-radius: 0.25rem
  padding: 1.25rem
  box-shadow: 0.125rem 0.625rem 1.25rem rgba(primary-color, 10%)
</style>
