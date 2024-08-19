<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import { Toaster } from '~/components/ui/toast'
import { BriefcaseBusiness, Check, Edit3, Mail, MapPin } from 'lucide-vue-next'
import IconLabel from '~/components/user/profile/iconLabel.vue'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Toast } from '~/models/toast'
import { ref } from 'vue'
import FileDropzone from '~/components/fileDropzone.vue'
import { InferPageProps } from '@adonisjs/inertia/types'
import UserController from '#controllers/user_controller'
import { HttpCode } from '~/lib/http_code'
import UserApi from '~/api/user_api'
import ConfirmationModal from '~/components/confirmationModal.vue'

const props = defineProps<{
  user: InferPageProps<UserController, 'showProfile'>['user']
}>()

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    location: z.string().optional(),
    portfolio_link: z.string().optional(),
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: props.user.email,
    first_name: props.user.first_name,
    last_name: props.user.last_name,
    location: props.user.location ?? '',
    portfolio_link: props.user.portfolio_link ?? '',
  },
})

const isEditing = ref(false)
const showModal = ref(false)

const handleSubmit = async () => {
  try {
    const response = await UserApi.delete()
    if (response.status === HttpCode.OK) {
      Toast.success({
        title: 'Compte supprimé',
        description: 'Votre compte a été supprimé avec succès',
      })
    }
  } catch (error) {
    Toast.error({
      title: 'Une erreur est survenue',
      description: 'Impossible de mettre à jour le profil',
    })
  }
}

function toggleEditMode() {
  isEditing.value = !isEditing.value
}

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const response = await UserApi.updateProfile(values)
    if (response.status === HttpCode.OK) {
      Toast.success({
        title: 'Profil mis à jour',
        description: 'Vos informations ont été mises à jour avec succès',
      })
    }
  } catch (error) {
    Toast.error({
      title: 'Une erreur est survenue',
      description: 'Impossible de mettre à jour le profil',
    })
  } finally {
    toggleEditMode()
  }
})

function userFullName() {
  return `${props.user.first_name.charAt(0).toUpperCase()}${props.user.first_name.slice(1)} ${props.user.last_name.charAt(0).toUpperCase()}${props.user.last_name.slice(1)}`
}

function downloadCv() {
  window.open(`/uploads/${props.user.cv}`)
}
async function uploadCv(cv: FormData) {
  try {
    const response = await UserApi.updateCV(cv)
    if (response.status === HttpCode.OK) {
      Toast.success({
        title: 'CV mis à jour',
        description: 'Votre CV a été mis à jour avec succès',
      })
      // Update user cv url to show the new one
      props.user.cv = response.data.fileUrl.toString()
    }
  } catch (error) {
    Toast.error({
      title: 'Une erreur est survenue',
      description: 'Impossible de mettre à jour le CV',
    })
  }
}
</script>

<template>
  <Head title="Profil utilisateur" />
  <Toaster />

  <div
    class="flex flex-col lg:flex-row items-center lg:items-start bg-gray-100 min-h-screen p-6 lg:p-12"
  >
    <!-- Profile Card -->
    <div
      class="w-full max-w-sm lg:max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col items-center lg:mr-6 mb-6 lg:mb-0"
    >
      <div
        class="rounded-full w-24 h-24 bg-accent flex items-center justify-center text-2xl font-semibold text-black overflow-hidden mb-4 uppercase"
      >
        <span>{{ user.first_name.charAt(0) + user.last_name.charAt(0) }}</span>
      </div>

      <h1 class="text-2xl font-bold mb-2">{{ userFullName() }}</h1>

      <form class="w-full" @submit="onSubmit">
        <div v-if="!isEditing" class="flex flex-col space-y-2">
          <IconLabel :icon="Mail" :label="props.user.email" />
          <IconLabel :icon="MapPin" :label="props.user?.location" />
          <IconLabel :icon="BriefcaseBusiness" :label="props.user?.portfolio_link" />
        </div>
        <div v-else class="grid w-full items-center gap-4">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="first_name">
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="last_name">
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="location">
            <FormItem>
              <FormLabel>Localisation</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="portfolio_link">
            <FormItem>
              <FormLabel>Lien du portfolio</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 w-full flex flex-col lg:flex-row items-center justify-between">
          <Button v-if="!isEditing" class="w-full lg:w-auto" type="button" @click="toggleEditMode">
            <Edit3 class="w-4 h-4 mr-2" />
            <span>Modifier le profil</span>
          </Button>
          <Button v-else type="submit">
            <Check class="w-4 h-4 mr-2" />
            <span>Enregistrer</span>
          </Button>

          <ConfirmationModal
            v-if="!isEditing"
            v-model="showModal"
            :onCancel="handleCancel"
            :onSubmit="handleSubmit"
            buttonVariant="destructive"
            cancelLabel="Annuler"
            confirmLabel="Supprimer mon compte"
            description="Êtes-vous sûr de vouloir effectuer cette action ?"
            title="Voulez-vous supprimer votre compte ?"
            triggerButtonClass="w-full lg:w-auto mt-3 lg:mt-0"
            triggerLabel="Supprimer mon compte"
          />
        </div>
      </form>
    </div>

    <!-- CV Section -->
    <div class="w-full max-w-sm lg:max-w-lg bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold mb-4">Curriculum Vitae</h2>
      <div v-if="!!user.cv" class="flex items-end">
        <Button variant="link" @click="downloadCv">Télécharger mon CV</Button>
        <iframe :src="`${user.cv}`" height="100px" width="70px"></iframe>
      </div>
      <FileDropzone
        :hasFile="!!user.cv"
        file-types-text="PDF jusqu'à 3MB"
        or-drop-text="ou glisser-déposer"
        upload-text="Choisir un fichier"
        @fileRemoved="user.cv = null"
        @fileSelected="uploadCv"
      />
    </div>
  </div>
</template>
