<script lang="ts" setup>
import User from '#models/user'
import UserProfile from '~/components/user/userProfile.vue'
import { Button } from '~/components/ui/button'

const props = defineProps<{
  user: User
}>()
</script>

<template>
  <header class="bg-white border-b flex items-center justify-between py-4 px-6 lg:px-12">
    <a href="/">
      <img alt="Logo" class="w-auto h-10 lg:h-14" src="/public/assets/candidoui_bw.png" />
    </a>
    <div class="flex items-center gap-4">
      <Button v-if="props.user" as-child>
        <a href="/offers/create"> Publier une offre </a>
      </Button>
      <UserProfile v-if="props.user" :user="props.user" />
      <div v-else>
        <Button as-child>
          <a href="/login"> Connexion </a>
        </Button>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
