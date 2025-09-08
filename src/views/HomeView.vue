<template>
  <div class="px-4 sm:px-0">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Clientes</h1>
          <p class="mt-2 text-gray-600">
            Gerencie os clientes empresariais
          </p>
        </div>
        <button
          @click="abrirModalCriar"
          class="btn-primary flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Novo Cliente
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div class="flex">
        <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
        </svg>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Erro ao carregar clientes</h3>
          <p class="mt-1 text-sm text-red-700">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading && clientes.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum cliente encontrado</h3>
      <p class="mt-1 text-sm text-gray-500">Comece criando um novo cliente.</p>
      <div class="mt-6">
        <button @click="abrirModalCriar" class="btn-primary">
          Novo Cliente
        </button>
      </div>
    </div>

    <!-- Clientes List -->
    <div v-else-if="!loading && clientes.length > 0" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="cliente in clientes"
        :key="cliente.id"
        class="card p-6 hover:shadow-lg transition-shadow duration-200"
      >
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-gray-900 truncate">
            {{ cliente.nomeEmpresa }}
          </h3>
          <div class="flex gap-2">
            <button
              @click="abrirModalEditar(cliente)"
              class="text-primary-600 hover:text-primary-700 p-1"
              title="Editar"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button
              @click="confirmarExclusao(cliente)"
              class="text-red-600 hover:text-red-700 p-1"
              title="Excluir"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">Porte:</span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getPorteClass(cliente.porteEmpresa)">
              {{ PORTE_EMPRESA_LABELS[cliente.porteEmpresa] }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">ID:</span>
            <span class="text-sm text-gray-700 font-mono">{{ cliente.id }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Criação/Edição -->
    <ClienteModal
      v-if="mostrarModal"
      :cliente="clienteSelecionado"
      :modo="modoModal"
      @fechar="fecharModal"
      @salvar="salvarCliente"
    />

    <!-- Modal de Confirmação de Exclusão -->
    <ConfirmacaoModal
      v-if="mostrarConfirmacao"
      :titulo="'Excluir Cliente'"
      :mensagem="`Tem certeza que deseja excluir o cliente '${clienteParaExcluir?.nomeEmpresa}'?`"
      @confirmar="excluirCliente"
      @cancelar="fecharConfirmacao"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useClienteStore } from '@/stores/clienteStore'
import type { Cliente, CreateClienteRequest, UpdateClienteRequest } from '@/types/Cliente'
import { PORTE_EMPRESA_LABELS } from '@/types/Cliente'
import ClienteModal from '@/components/ClienteModal.vue'
import ConfirmacaoModal from '@/components/ConfirmacaoModal.vue'

const clienteStore = useClienteStore()
const { clientes, loading, error } = storeToRefs(clienteStore)

// Estado do modal
const mostrarModal = ref(false)
const mostrarConfirmacao = ref(false)
const clienteSelecionado = ref<Cliente | null>(null)
const clienteParaExcluir = ref<Cliente | null>(null)
const modoModal = ref<'criar' | 'editar'>('criar')

// Carregar clientes ao montar o componente
onMounted(() => {
  clienteStore.carregarClientes()
})


// Funções do modal
const abrirModalCriar = () => {
  clienteSelecionado.value = null
  modoModal.value = 'criar'
  mostrarModal.value = true
}

const abrirModalEditar = (cliente: Cliente) => {
  clienteSelecionado.value = cliente
  modoModal.value = 'editar'
  mostrarModal.value = true
}

const fecharModal = () => {
  mostrarModal.value = false
  clienteSelecionado.value = null
}

// Funções de CRUD
const salvarCliente = async (dados: CreateClienteRequest | UpdateClienteRequest) => {
  try {
    if (modoModal.value === 'criar') {
      await clienteStore.criarCliente(dados as CreateClienteRequest)
    } else {
      await clienteStore.atualizarCliente(clienteSelecionado.value!.id, dados as UpdateClienteRequest)
    }
    fecharModal()
  } catch (error) {
    // Erro já é tratado na store
  }
}

const confirmarExclusao = (cliente: Cliente) => {
  clienteParaExcluir.value = cliente
  mostrarConfirmacao.value = true
}

const fecharConfirmacao = () => {
  mostrarConfirmacao.value = false
  clienteParaExcluir.value = null
}

const excluirCliente = async () => {
  if (clienteParaExcluir.value) {
    try {
      await clienteStore.excluirCliente(clienteParaExcluir.value.id)
      fecharConfirmacao()
    } catch (error) {
      // Erro já é tratado na store
    }
  }
}

// Função para obter classe CSS do porte
const getPorteClass = (porte: number) => {
  switch (porte) {
    case 1: // Pequena
      return 'bg-green-100 text-green-800'
    case 2: // Média
      return 'bg-yellow-100 text-yellow-800'
    case 3: // Grande
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>
