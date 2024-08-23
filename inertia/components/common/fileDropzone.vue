<template>
  <div
    class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors duration-300 ease-in-out"
    @dragover.prevent
    @drop.prevent="handleDrop"
  >
    <div v-if="!selectedFile" class="space-y-2">
      <svg
        aria-hidden="true"
        class="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 48 48"
      >
        <path
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
      <div class="text-sm text-gray-600">
        <label
          class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
          for="file-upload"
        >
          <span>{{ uploadText }}</span>
          <input
            id="file-upload"
            class="sr-only"
            name="file-upload"
            type="file"
            @change="handleFileInput"
          />
        </label>
        <p class="pl-1">{{ orDropText }}</p>
      </div>
      <p class="text-xs text-gray-500">{{ fileTypesText }}</p>
    </div>
    <div v-else class="space-y-2">
      <svg
        class="mx-auto h-12 w-12 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
      <p class="text-sm text-gray-600">Fichier sélectionné :</p>
      <p class="text-sm font-medium text-gray-900">{{ selectedFile.name }}</p>
      <button
        class="mt-2 text-sm text-red-600 hover:text-red-500 focus:outline-none focus:underline"
        @click="resetFile"
      >
        Supprimer le fichier
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  uploadText: {
    type: String,
    default: 'Upload a file',
  },
  orDropText: {
    type: String,
    default: 'or drag and drop',
  },
  fileTypesText: {
    type: String,
    default: 'PDF up to 3MB',
  },
  hasFile: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['fileSelected', 'fileRemoved'])

const selectedFile = ref(props.hasFile ?? null)

const handleDrop = (event) => {
  const files = event.dataTransfer.files
  if (files.length) {
    const formData = new FormData()
    formData.append('cv', files[0])
    selectedFile.value = files[0]
    emit('fileSelected', formData)
  }
}

const handleFileInput = (event) => {
  const files = event.target.files
  if (files.length) {
    const formData = new FormData()
    formData.append('cv', files[0])
    selectedFile.value = files[0]
    emit('fileSelected', formData)
  }
}

const resetFile = () => {
  selectedFile.value = null
  emit('fileRemoved')
}
</script>
