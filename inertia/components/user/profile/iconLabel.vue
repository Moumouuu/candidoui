<script lang="ts" setup>
const props = defineProps<{
  icon: any
  label: string | null
}>()
</script>

<template>
  <span class="flex items-center">
    <component :is="props.icon" />
    <span class="ml-2">{{ props.label ?? '-' }}</span>
  </span>
</template>

<style scoped></style>
