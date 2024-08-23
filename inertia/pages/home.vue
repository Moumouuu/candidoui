<script lang="ts" setup>
import { Toaster } from '~/components/ui/toast'
import Header from '~/components/layout/header.vue'
import { InferPageProps } from '@adonisjs/inertia/types'
import HomeController from '#controllers/home_controller'
import { Head } from '@inertiajs/vue3'

const props = defineProps<{
  user: InferPageProps<HomeController, 'index'>['user']
}>()
</script>

<template>
  <Toaster />
  <Head title="Accueil" />
  <Header :user="props.user" />
</template>
