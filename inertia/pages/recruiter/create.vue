<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import Header from '~/components/layout/header.vue'
import RecruiterController from '#controllers/recruiter_controller'
import { InferPageProps } from '@adonisjs/inertia/types'

const props = defineProps<{
  user: InferPageProps<RecruiterController, 'show'>['user']
}>()
</script>

<template>
  <Header :user="props.user" />
  <Head title="Devenir recruteur" />
</template>

<style scoped></style>
