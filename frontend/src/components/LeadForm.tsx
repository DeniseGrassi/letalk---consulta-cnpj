import { useState, type ChangeEvent } from 'react'
import type { FormEvent } from 'react'
import type { LeadFormData } from '../types/lead'

type LeadFormProps = {
  onSubmit: (data: LeadFormData) => void
  isLoading: boolean
}

export function LeadForm({ onSubmit, isLoading }: LeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    cnpj: ''
  })

function handleChange(event: ChangeEvent<HTMLInputElement>) {
  const { name, value } = event.target

  setFormData((currentData) => ({
    ...currentData,
    [name]: value,
  }))
}

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()
  onSubmit(formData)
}

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nome do contato</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Ex: Nome Completo"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Ex: contato@empresa.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Telefone</label>
        <input
          id="phone"
          name="phone"
          type="text"
          placeholder="Ex: 00999999999"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="cnpj">CNPJ</label>
        <input
          id="cnpj"
          name="cnpj"
          type="text"
          placeholder="Ex: 00.000.000/0000-00"
          value={formData.cnpj}
          onChange={handleChange}
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Consultando...' : 'Consultar empresa'}
      </button>
    </form>
  )
}