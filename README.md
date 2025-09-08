# OpeaWeb - Frontend Vue.js

Frontend Vue.js para consumo da API OpeaAPI - Sistema de gestão de clientes empresariais.

## 🚀 Tecnologias Utilizadas

- **Vue 3** - Framework JavaScript reativo
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Vue Router** - Roteamento
- **Pinia** - Gerenciamento de estado
- **Tailwind CSS** - Framework CSS utilitário
- **Axios** - Cliente HTTP
- **ESLint** - Linting de código
- **Prettier** - Formatação de código

## 📋 Funcionalidades

- ✅ **Listagem de clientes** - Visualização de todos os clientes cadastrados
- ✅ **Criação de clientes** - Cadastro de novos clientes
- ✅ **Edição de clientes** - Atualização de dados dos clientes
- ✅ **Exclusão de clientes** - Remoção de clientes com confirmação
- ✅ **Validação de formulários** - Validação client-side
- ✅ **Interface responsiva** - Layout adaptável para diferentes telas
- ✅ **Feedback visual** - Loading states e mensagens de erro

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ClienteModal.vue
│   └── ConfirmacaoModal.vue
├── services/           # Serviços de API
│   └── api.ts
├── stores/             # Stores Pinia
│   └── clienteStore.ts
├── types/              # Definições TypeScript
│   └── Cliente.ts
├── views/              # Páginas/Vistas
│   └── HomeView.vue
├── router/             # Configuração de rotas
│   └── index.ts
├── App.vue             # Componente raiz
├── main.ts             # Ponto de entrada
└── style.css           # Estilos globais
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- API OpeaAPI rodando em https://localhost:7186

### Instalação e Execução

1. **Instalar dependências**
```bash
npm install
```

2. **Executar em modo desenvolvimento**
```bash
npm run dev
```

3. **Acessar a aplicação**
- URL: http://localhost:3000

### Outros Comandos

```bash
# Build para produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint

# Formatação de código
npm run format
```

## 🔧 Configuração

### API Base URL

A URL base da API está configurada em `src/services/api.ts`:

```typescript
const API_BASE_URL = 'https://localhost:7186/api'
```

Para alterar a URL da API, modifique esta constante.

### Porte da Empresa

Os portes de empresa disponíveis são:

- **Pequena** (1)
- **Média** (2) 
- **Grande** (3)

## 📱 Interface

### Tela Principal

- **Header** com título e botão de novo cliente
- **Grid responsivo** com cards dos clientes
- **Ações** de editar e excluir em cada card
- **Estados** de loading, erro e vazio

### Modal de Cliente

- **Formulário** com validação
- **Campos** obrigatórios com feedback visual
- **Botões** de salvar e cancelar
- **Loading** durante operações

### Modal de Confirmação

- **Confirmação** antes de excluir
- **Feedback visual** com ícones
- **Botões** de confirmar e cancelar

## 🎨 Design System

### Cores

- **Primary**: Azul (#3b82f6)
- **Success**: Verde (para porte pequena)
- **Warning**: Amarelo (para porte média)
- **Info**: Azul (para porte grande)
- **Danger**: Vermelho (para exclusão)

### Componentes

- **Botões**: Primary, Secondary, Danger
- **Inputs**: Com validação visual
- **Cards**: Com hover effects
- **Modais**: Com overlay e animações

## 🧪 Testes

O projeto está configurado para testes, mas ainda não possui testes implementados.

```bash
# Executar testes (quando implementados)
npm run test
```

## 📝 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

**Desenvolvido com ❤️ usando Vue.js 3 e TypeScript**
