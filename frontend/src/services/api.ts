import type { LeadFormData, LeadResult } from '../types/lead'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333'

export async function enrichLead(
  leadData: LeadFormData
): Promise<LeadResult> {
  const response = await fetch(`${API_URL}/api/leads/enrich`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(leadData)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Erro ao buscar dados da empresa.')
  }

  return data
}