export interface Cliente {
  id: string
  nomeEmpresa: string
  porteEmpresa: PorteEmpresa
}

export enum PorteEmpresa {
  Pequena = 1,
  Media = 2,
  Grande = 3
}

export interface CreateClienteRequest {
  nomeEmpresa: string
  porteEmpresa: PorteEmpresa
}

export interface UpdateClienteRequest {
  nomeEmpresa: string
  porteEmpresa: PorteEmpresa
}

export const PORTE_EMPRESA_LABELS: Record<PorteEmpresa, string> = {
  [PorteEmpresa.Pequena]: 'Pequena',
  [PorteEmpresa.Media]: 'Média',
  [PorteEmpresa.Grande]: 'Grande'
}
