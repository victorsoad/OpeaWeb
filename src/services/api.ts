import axios from 'axios'
import type { Cliente, CreateClienteRequest, UpdateClienteRequest } from '@/types/Cliente'

// Usar proxy do Vite em desenvolvimento, API direta em produção
const API_BASE_URL = (import.meta as any).env?.DEV ? '/api' : ((import.meta as any).env?.VITE_API_BASE_URL || 'https://localhost:7186/api')

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 segundos de timeout
})

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const clienteService = {
  // Listar todos os clientes
  async listarClientes(): Promise<Cliente[]> {
    const response = await api.get<Cliente[]>('/clientes')
    return response.data
  },

  // Buscar cliente por ID
  async buscarCliente(id: string): Promise<Cliente> {
    const response = await api.get<Cliente>(`/clientes/${id}`)
    return response.data
  },

  // Criar novo cliente
  async criarCliente(cliente: CreateClienteRequest): Promise<Cliente> {
    const response = await api.post<Cliente>('/clientes', cliente)
    return response.data
  },

  // Atualizar cliente
  async atualizarCliente(id: string, cliente: UpdateClienteRequest): Promise<Cliente> {
    const dados = { ...cliente, id }
    const response = await api.put<Cliente>(`/clientes/${id}`, dados)
    return response.data
  },

  // Excluir cliente
  async excluirCliente(id: string): Promise<void> {
    await api.delete(`/clientes/${id}`)
  }
}

export default api
