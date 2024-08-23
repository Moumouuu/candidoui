<script lang="ts" setup>
import Header from '~/components/layout/header.vue'
import { InferPageProps } from '@adonisjs/inertia/types'
import OfferController from '#controllers/offer_controller'

const props = defineProps<{
  user: InferPageProps<OfferController, 'show'>['user']
}>()
</script>

<template>
  <Header :user="props.user" />
</template>

<style scoped></style>
