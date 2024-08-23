<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import Header from '~/components/layout/header.vue'
import RecruiterController from '#controllers/recruiter_controller'
import { Check, Circle, Dot } from 'lucide-vue-next'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ref } from 'vue'
import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '~/components/ui/stepper'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Toaster } from '~/components/ui/toast'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Toast } from '~/models/toast'
import RecruiterApi from '~/api/recruiter_api'
import { HttpCode } from '~/lib/http_code'

const formSchema = [
  z.object({
    company_name: z.string().min(2),
    location: z.string().min(2),
  }),
  z.object({
    sector_of_activity: z.string().min(2),
  }),
]

const stepIndex = ref(1)
const steps = [
  {
    step: 1,
    title: 'Détails',
    description: 'Les informations générales de votre entreprise',
  },
  {
    step: 2,
    title: 'Secteurs',
    description: "Définissez les secteurs d'activité de votre entreprise",
  },
]

async function onSubmit(values: any) {
  try {
    const response = await RecruiterApi.create(values)
    if (response.status === HttpCode.CREATED) {
      Toast.success({
        title: 'Vous êtes recruteur !',
        description: 'Vous pouvez maintenant créer des offres.',
      })
      window.location.href = '/offers/create'
    }
  } catch (error) {
    Toast.error({
      title: 'Une erreur est survenue',
      description: 'Veuillez vérifier vos informations et réessayer.',
    })
  }
}

const props = defineProps<{
  user: InferPageProps<RecruiterController, 'show'>['user']
}>()
</script>

<template>
  <Header :user="props.user" />
  <Head title="Devenir recruteur" />
  <Toaster />
  <div class="flex flex-col items-center justify-center my-12">
    <h1 class="text-3xl font-bold mb-2">Devenir recruteur</h1>
    <span class="text-sm text-muted-foreground text-center w-1/2">
      Veuillez remplir les informations suivantes pour devenir recruteur. Vous pourrez modifier vos
      informations à tout moment depuis votre profil.
    </span>
  </div>

  <section class="flex justify-center items-center mx-auto w-1/2">
    <Form
      v-slot="{ meta, values, validate }"
      :validation-schema="toTypedSchema(formSchema[stepIndex - 1])"
      as=""
      keep-values
    >
      <Stepper
        v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
        v-model="stepIndex"
        class="block w-full"
      >
        <form
          @submit="
            (e) => {
              e.preventDefault()
              validate()

              if (stepIndex === steps.length && meta.valid) {
                onSubmit(values)
              }
            }
          "
        >
          <div class="flex w-full flex-start gap-2">
            <StepperItem
              v-for="step in steps"
              :key="step.step"
              v-slot="{ state }"
              :step="step.step"
              class="relative flex w-full flex-col items-center justify-center"
            >
              <StepperSeparator
                v-if="step.step !== steps[steps.length - 1].step"
                class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
              />

              <StepperTrigger as-child>
                <Button
                  :class="[
                    state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background',
                  ]"
                  :disabled="state !== 'completed' && !meta.valid"
                  :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                  class="z-10 rounded-full shrink-0"
                  size="icon"
                >
                  <Check v-if="state === 'completed'" class="size-5" />
                  <Circle v-if="state === 'active'" />
                  <Dot v-if="state === 'inactive'" />
                </Button>
              </StepperTrigger>

              <div class="mt-5 flex flex-col items-center text-center">
                <StepperTitle
                  :class="[state === 'active' && 'text-primary']"
                  class="text-sm font-semibold transition lg:text-base"
                >
                  {{ step.title }}
                </StepperTitle>
                <StepperDescription
                  :class="[state === 'active' && 'text-primary']"
                  class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
                >
                  {{ step.description }}
                </StepperDescription>
              </div>
            </StepperItem>
          </div>

          <div class="flex flex-col gap-4 mt-4">
            <template v-if="stepIndex === 1">
              <FormField v-slot="{ componentField }" name="company_name">
                <FormItem>
                  <FormLabel>Nom de l'entreprise*</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="location">
                <FormItem>
                  <FormLabel>Localisation*</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </template>

            <template v-if="stepIndex === 2">
              <FormField v-slot="{ componentField }" name="sector_of_activity">
                <FormItem>
                  <FormLabel>Secteur d'activité*</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </template>
          </div>

          <div class="flex items-center justify-between mt-4">
            <Button :disabled="isPrevDisabled" size="sm" variant="outline" @click="prevStep()">
              Précédent
            </Button>
            <div class="flex items-center gap-3">
              <Button
                v-if="stepIndex !== 2"
                :disabled="isNextDisabled"
                :type="meta.valid ? 'button' : 'submit'"
                size="sm"
                @click="meta.valid && nextStep()"
              >
                Suivant
              </Button>
              <Button v-if="stepIndex === 2" size="sm" type="submit"> Devenir recruteur</Button>
            </div>
          </div>
        </form>
      </Stepper>
    </Form>
  </section>
</template>

<style scoped></style>
