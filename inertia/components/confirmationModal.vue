<script lang="ts" setup>
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer'

const props = defineProps<{
  modelValue: boolean
  title: string
  description: string
  triggerLabel: string
  confirmLabel: string
  cancelLabel: string
  onSubmit: () => void
  onCancel: () => void
  triggerButtonClass?: string
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}>()

const emit = defineEmits(['update:modelValue'])

const isDesktop = useMediaQuery('(min-width: 768px)')

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const handleSubmit = () => {
  props.onSubmit()
  isOpen.value = false
}

const handleCancel = () => {
  props.onCancel()
  isOpen.value = false
}

const DialogOrDrawer = computed(() => (isDesktop.value ? Dialog : Drawer))
const DialogOrDrawerTrigger = computed(() => (isDesktop.value ? DialogTrigger : DrawerTrigger))
const DialogOrDrawerContent = computed(() => (isDesktop.value ? DialogContent : DrawerContent))
const DialogOrDrawerHeader = computed(() => (isDesktop.value ? DialogHeader : DrawerHeader))
const DialogOrDrawerTitle = computed(() => (isDesktop.value ? DialogTitle : DrawerTitle))
const DialogOrDrawerDescription = computed(() =>
  isDesktop.value ? DialogDescription : DrawerDescription
)
</script>
<template>
  <component :is="DialogOrDrawer" v-model:open="isOpen">
    <component :is="DialogOrDrawerTrigger" as-child>
      <Button :class="triggerButtonClass" :variant="buttonVariant || 'outline'">
        {{ triggerLabel }}
      </Button>
    </component>
    <component :is="DialogOrDrawerContent" :class="{ 'sm:max-w-[425px]': isDesktop }" class="pb-8">
      <component :is="DialogOrDrawerHeader" :class="{ 'text-left': !isDesktop }">
        <component :is="DialogOrDrawerTitle">{{ title }}</component>
        <component :is="DialogOrDrawerDescription">{{ description }}</component>
      </component>
      <div class="flex justify-end space-x-2 pt-4">
        <Button class="w-full lg:w-auto" variant="outline" @click="handleCancel">{{
          cancelLabel
        }}</Button>
        <Button
          :variant="buttonVariant || 'default'"
          class="w-full lg:w-auto"
          @click="handleSubmit"
          >{{ confirmLabel }}</Button
        >
      </div>
    </component>
  </component>
</template>
