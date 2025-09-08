import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Cliente, CreateClienteRequest, UpdateClienteRequest } from '@/types/Cliente'
import { clienteService } from '@/services/api'

export const useClienteStore = defineStore('cliente', () => {
  // Estado
  const clientes = ref<Cliente[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const totalClientes = computed(() => clientes.value.length)

  // Actions
  const carregarClientes = async () => {
    try {
      loading.value = true
      error.value = null
      
      const dados = await clienteService.listarClientes()
      clientes.value = [...dados]
    } catch (err: any) {
      console.error('Erro ao carregar clientes:', err)
      error.value = err.response?.data?.message || err.message || 'Erro ao carregar clientes'
    } finally {
      loading.value = false
    }
  }

  const criarCliente = async (dadosCliente: CreateClienteRequest) => {
    try {
      loading.value = true
      error.value = null
      const novoCliente = await clienteService.criarCliente(dadosCliente)
      clientes.value.push(novoCliente)
      return novoCliente
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao criar cliente'
      console.error('Erro ao criar cliente:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const atualizarCliente = async (id: string, dadosCliente: UpdateClienteRequest) => {
    try {
      loading.value = true
      error.value = null
      const clienteAtualizado = await clienteService.atualizarCliente(id, dadosCliente)
      const index = clientes.value.findIndex(c => c.id === id)
      if (index !== -1) {
        clientes.value[index] = clienteAtualizado
      }
      return clienteAtualizado
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao atualizar cliente'
      console.error('Erro ao atualizar cliente:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const excluirCliente = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      await clienteService.excluirCliente(id)
      clientes.value = clientes.value.filter(c => c.id !== id)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao excluir cliente'
      console.error('Erro ao excluir cliente:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const limparError = () => {
    error.value = null
  }

  return {
    // Estado
    clientes,
    loading,
    error,
    // Getters
    totalClientes,
    // Actions
    carregarClientes,
    criarCliente,
    atualizarCliente,
    excluirCliente,
    limparError
  }
})
