type Priority = 'Alta' | 'Média' | 'Baixa'

type PriorityResult = {
  priority: Priority
  reasons: string[]
}

export function calculatePriority(status: string, segment: string): PriorityResult {
  const reasons: string[] = []

  if (status.toLowerCase().includes('ativa')) {
    reasons.push('Empresa ativa')
  }

  if (
    ['Comércio', 'Serviços', 'Alimentação', 'Tecnologia', 'Educação', 'Saúde'].includes(
      segment
    )
  ) {
    reasons.push(
      'Segmento com forte potencial de uso de atendimento, relacionamento e automação'
    )
  }

  if (segment === 'Financeiro') {
    reasons.push(
      'Segmento com alto volume de relacionamento com clientes, mas que pode exigir abordagem mais consultiva'
    )
  }

  if (reasons.length >= 2) {
    return {
      priority: 'Alta',
      reasons
    }
  }

  if (reasons.length === 1) {
    return {
      priority: 'Média',
      reasons
    }
  }

  return {
    priority: 'Baixa',
    reasons: ['Poucos dados estratégicos disponíveis para priorização']
  }
}