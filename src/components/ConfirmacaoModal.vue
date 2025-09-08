<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="cancelar"></div>

      <!-- Modal -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ titulo }}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ mensagem }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            @click="confirmar"
            :disabled="loading"
            class="btn-danger w-full sm:w-auto sm:ml-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Excluindo...
            </span>
            <span v-else>Excluir</span>
          </button>
          <button
            type="button"
            @click="cancelar"
            :disabled="loading"
            class="btn-secondary w-full sm:w-auto mt-3 sm:mt-0 sm:mr-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  titulo: string
  mensagem: string
}

interface Emits {
  (e: 'confirmar'): void
  (e: 'cancelar'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const loading = ref(false)

const confirmar = () => {
  loading.value = true
  emit('confirmar')
  // Reset loading após um tempo para permitir que o componente pai gerencie o estado
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

const cancelar = () => {
  if (!loading.value) {
    emit('cancelar')
  }
}

// Fechar com ESC
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && !loading.value) {
    cancelar()
  }
}

import { onMounted, onUnmounted } from 'vue'
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
