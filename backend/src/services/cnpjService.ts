import axios from 'axios'
import { classifySegment } from '../utils/classifySegment'
import { estimateEmployees } from '../utils/estimateEmployees'
import { calculatePriority } from '../utils/calculatePriority'

type LeadInput = {
  name: string
  email: string
  phone: string
  cnpj: string
}

export async function enrichLeadWithCnpjData(lead: LeadInput) {
  const brasilApiUrl = process.env.BRASIL_API_URL

  if (!brasilApiUrl) {
    throw new Error('BRASIL_API_URL is not configured')
  }

  const { data } = await axios.get(`${brasilApiUrl}/${lead.cnpj}`)

  const mainActivity = data.cnae_fiscal_descricao || 'Não informado'
  const segment = classifySegment(mainActivity)
  const estimatedEmployees = estimateEmployees(data.porte)
  const leadPriority = calculatePriority(data.descricao_situacao_cadastral, segment)

  return {
    lead: {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      cnpj: lead.cnpj
    },
    company: {
      cnpj: data.cnpj,
      corporateName: data.razao_social,
      tradeName: data.nome_fantasia || 'Não informado',
      status: data.descricao_situacao_cadastral,
      companySize: data.porte || 'Não informado',
      estimatedEmployees,
      openingDate: data.data_inicio_atividade,
      mainActivity,
      cnae: data.cnae_fiscal,
      segment,
      city: data.municipio,
      state: data.uf,
      street: data.logradouro,
      number: data.numero,
      neighborhood: data.bairro
    },
    analysis: {
      priority: leadPriority.priority,
      reasons: leadPriority.reasons,
      summary: `Lead vinculado a uma empresa ${data.descricao_situacao_cadastral?.toLowerCase()} do segmento ${segment}.`
    }
  }
}