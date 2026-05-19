import type { LeadResult } from '../types/lead'

function formatCnpj(cnpj: string): string {
  const onlyNumbers = cnpj.replace(/\D/g, '')

  if (onlyNumbers.length !== 14) {
    return cnpj
  }

  return onlyNumbers.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  )
}

type CompanyCardProps = {
  company: LeadResult['company']
  lead: LeadResult['lead']
}

export function CompanyCard({ company, lead }: CompanyCardProps) {
  return (
    <section className="card">
      <div className="card-header">
        <span className="tag">{company.segment}</span>
        <span className={`status ${company.status.toLowerCase()}`}>
          {company.status}
        </span>
      </div>

      <h2>{company.tradeName !== 'Não informado' ? company.tradeName : company.corporateName}</h2>
      <p className="muted">{company.corporateName}</p>

      <div className="info-grid">
        <div>
          <strong>Contato</strong>
          <span>{lead.name}</span>
        </div>

        <div>
          <strong>E-mail</strong>
          <span>{lead.email}</span>
        </div>

        <div>
          <strong>Telefone</strong>
          <span>{lead.phone}</span>
        </div>

        <div>
          <strong>CNPJ</strong>
          <span>{formatCnpj(company.cnpj)}</span>
        </div>

        <div>
          <strong>Porte</strong>
          <span>{company.companySize}</span>
        </div>

        <div>
          <strong>Funcionários estimados</strong>
          <span>{company.estimatedEmployees}</span>
        </div>

        <div>
          <strong>Abertura</strong>
          <span>{company.openingDate}</span>
        </div>

        <div>
          <strong>Localização</strong>
          <span>
            {company.city}/{company.state}
          </span>
        </div>
      </div>

      <div className="activity-box">
        <strong>Atividade principal</strong>
        <p>
          CNAE {company.cnae} — {company.mainActivity}
        </p>
      </div>
    </section>
  )
}