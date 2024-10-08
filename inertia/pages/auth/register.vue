<script lang="ts" setup>
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useForm } from 'vee-validate'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { AuthApi } from '~/api/auth_api'
import { Toaster } from '~/components/ui/toast'
import { Toast } from '~/models/toast'
import { HttpCode } from '~/lib/http_code'
import { Head } from '@inertiajs/vue3'

const formSchema = toTypedSchema(
  z.object({
    first_name: z.string().min(2),
    last_name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
  })
)
const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const response = await AuthApi.register(values)
    if (response.status === HttpCode.CREATED) {
      window.location.href = '/'
    }
  } catch (error) {
    Toast.error({
      title: 'Une erreur est survenue',
      description: 'Une erreur serveur est survenue',
    })
  }
})
</script>

<template>
  <Head title="Créer un compte" />
  <Toaster />
  <div class="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">Créer un compte</h1>
          <p class="text-balance text-muted-foreground">
            Créez un compte pour commencer à consulter les offres d'emploi.
          </p>
        </div>
        <form @submit="onSubmit">
          <div class="flex gap-4">
            <FormField v-slot="{ componentField }" name="first_name">
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="John" type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="last_name">
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.fr" type="email" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" type="password" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button class="w-full mt-4" type="submit"> Créer un compte </Button>
        </form>
        <div class="mt-4 text-center text-sm">
          Vous avez un compte ?
          <a class="underline" href="/login"> Se connecter </a>
        </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <img
        alt="Image"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        height="1080"
        src="https://img.freepik.com/free-vector/jobs-background-design_1200-196.jpg"
        width="1920"
      />
    </div>
  </div>
</template>
