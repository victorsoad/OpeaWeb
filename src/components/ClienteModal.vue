<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="fechar"></div>

      <!-- Modal -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <form @submit.prevent="salvar">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {{ modo === 'criar' ? 'Novo Cliente' : 'Editar Cliente' }}
                </h3>
                
                <div class="space-y-4">
                  <!-- Nome da Empresa -->
                  <div>
                    <label for="nomeEmpresa" class="block text-sm font-medium text-gray-700 mb-1">
                      Nome da Empresa *
                    </label>
                    <input
                      id="nomeEmpresa"
                      v-model="form.nomeEmpresa"
                      type="text"
                      maxlength="100"
                      class="input-field"
                      :class="{ 'border-red-300': errors.nomeEmpresa }"
                      placeholder="Digite o nome da empresa"
                    />
                    <p v-if="errors.nomeEmpresa" class="mt-1 text-sm text-red-600">
                      {{ errors.nomeEmpresa }}
                    </p>
                  </div>

                  <!-- Porte da Empresa -->
                  <div>
                    <label for="porteEmpresa" class="block text-sm font-medium text-gray-700 mb-1">
                      Porte da Empresa *
                    </label>
                    <select
                      id="porteEmpresa"
                      v-model="form.porteEmpresa"
                      class="input-field"
                      :class="{ 'border-red-300': errors.porteEmpresa }"
                    >
                      <option value="">Selecione o porte</option>
                      <option :value="PorteEmpresa.Pequena">Pequena</option>
                      <option :value="PorteEmpresa.Media">Média</option>
                      <option :value="PorteEmpresa.Grande">Grande</option>
                    </select>
                    <p v-if="errors.porteEmpresa" class="mt-1 text-sm text-red-600">
                      {{ errors.porteEmpresa }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              :disabled="loading"
              class="btn-primary w-full sm:w-auto sm:ml-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Salvando...
              </span>
              <span v-else>
                {{ modo === 'criar' ? 'Criar' : 'Salvar' }}
              </span>
            </button>
            <button
              type="button"
              @click="fechar"
              :disabled="loading"
              class="btn-secondary w-full sm:w-auto mt-3 sm:mt-0 sm:mr-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import type { Cliente, CreateClienteRequest, UpdateClienteRequest } from '@/types/Cliente'
import { PorteEmpresa } from '@/types/Cliente'

interface Props {
  cliente?: Cliente | null
  modo: 'criar' | 'editar'
}

interface Emits {
  (e: 'fechar'): void
  (e: 'salvar', dados: CreateClienteRequest | UpdateClienteRequest): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Estado do formulário
const form = reactive<CreateClienteRequest>({
  nomeEmpresa: '',
  porteEmpresa: PorteEmpresa.Pequena
})

const errors = reactive({
  nomeEmpresa: '',
  porteEmpresa: ''
})

const loading = ref(false)

// Inicializar formulário
const inicializarFormulario = () => {
  if (props.cliente && props.modo === 'editar') {
    form.nomeEmpresa = props.cliente.nomeEmpresa
    form.porteEmpresa = props.cliente.porteEmpresa
  } else {
    form.nomeEmpresa = ''
    form.porteEmpresa = PorteEmpresa.Pequena
  }
  limparErros()
}

// Limpar erros
const limparErros = () => {
  errors.nomeEmpresa = ''
  errors.porteEmpresa = ''
}

// Validar formulário
const validarFormulario = (): boolean => {
  limparErros()
  let valido = true

  // Validar nome da empresa
  if (!form.nomeEmpresa.trim()) {
    errors.nomeEmpresa = 'Nome da empresa é obrigatório'
    valido = false
  } else if (form.nomeEmpresa.trim().length < 1) {
    errors.nomeEmpresa = 'Nome da empresa deve ter pelo menos 1 caractere'
    valido = false
  } else if (form.nomeEmpresa.trim().length > 100) {
    errors.nomeEmpresa = 'Nome da empresa deve ter no máximo 100 caracteres'
    valido = false
  }

  // Validar porte da empresa
  if (!form.porteEmpresa) {
    errors.porteEmpresa = 'Porte da empresa é obrigatório'
    valido = false
  }

  return valido
}

// Salvar
const salvar = async () => {
  if (!validarFormulario()) {
    return
  }

  loading.value = true
  
  try {
    const dados = {
      nomeEmpresa: form.nomeEmpresa.trim(),
      porteEmpresa: form.porteEmpresa
    }
    
    emit('salvar', dados)
  } catch (error) {
    console.error('Erro ao salvar:', error)
  } finally {
    loading.value = false
  }
}

// Fechar modal
const fechar = () => {
  if (!loading.value) {
    emit('fechar')
  }
}

// Fechar com ESC
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && !loading.value) {
    fechar()
  }
}

// Watchers
watch(() => props.cliente, inicializarFormulario, { immediate: true })
watch(() => props.modo, inicializarFormulario)

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

// Cleanup
import { onUnmounted } from 'vue'
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
