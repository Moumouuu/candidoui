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

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })
)
const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const response = await AuthApi.login(values)
    if (response.status === HttpCode.OK) {
      window.location.href = '/'
    }
  } catch (error) {
    Toast.error({
      title: 'Une erreur est survenue',
      description: 'Email ou mot de passe incorrect',
    })
  }
})
</script>

<template>
  <Toaster />
  <div class="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">Se connecter</h1>
          <p class="text-balance text-muted-foreground">
            Connectez-vous à votre compte pour accéder aux offres d'emploi.
          </p>
        </div>
        <form @submit="onSubmit">
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
          <Button class="w-full mt-4" type="submit"> Se connecter </Button>
        </form>
        <div class="mt-4 text-center text-sm">
          Vous n'avez pas de compte ?
          <a class="underline" href="/register"> Créer un compte </a>
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
