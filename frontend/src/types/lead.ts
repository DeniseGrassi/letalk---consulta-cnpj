export type LeadFormData = {
  name: string
  email: string
  phone: string
  cnpj: string
}

export type LeadResult = {
  lead: {
    name: string
    email: string
    phone: string
    cnpj: string
  }
  company: {
    cnpj: string
    corporateName: string
    tradeName: string
    status: string
    companySize: string
    estimatedEmployees: string
    openingDate: string
    mainActivity: string
    cnae: number
    segment: string
    city: string
    state: string
    street: string
    number: string
    neighborhood: string
  }
  analysis: {
    priority: 'Alta' | 'Média' | 'Baixa'
    reasons: string[]
    summary: string
  }
}