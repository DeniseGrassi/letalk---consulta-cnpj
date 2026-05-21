import { useState } from 'react'
import './App.css'
import { LeadForm } from './components/LeadForm'
import { CompanyCard } from './components/CompanyCard'
import { LeadAnalysisCard } from './components/LeadAnalysisCard'
import { enrichLead } from './services/api'
import type { LeadResult, LeadFormData } from './types/lead'

function App() {
  const [leadData, setLeadData] = useState<LeadResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleEnrichLead(data: LeadFormData) {
    try {
      setIsLoading(true)
      setErrorMessage('')
      setLeadData(null)

      const response = await enrichLead(data)

      setLeadData(response)
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Erro inesperado ao consultar lead.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <div>
          <span className="eyebrow">Letalk</span>
          <h1>Consulta de empresas por CNPJ</h1>
          <p>
            <p>
              Consulte os principais dados da empresa para apoiar a análise do lead.
            </p>
          </p>
        </div>
      </section>

      <section className="content">
        <div className="form-panel">
          <h2>Dados do contato</h2>
          <p>
            <p>
              Preencha os dados do contato e informe o CNPJ da empresa.
            </p>
          </p>

          <LeadForm onSubmit={handleEnrichLead} isLoading={isLoading} />

          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>

        <div className="result-panel">
          {!leadData && !isLoading && (
            <div className="empty-state">
              <h2>Nenhuma empresa consultada</h2>
              <p>
                <p>
                  Faça uma consulta para visualizar os principais dados da empresa.
                </p>
              </p>
            </div>
          )}

          {isLoading && (
            <div className="empty-state">
              <h2>Consultando CNPJ...</h2>
              <p>Buscando informações cadastrais e preparando a análise.</p>
            </div>
          )}

          {leadData && (
            <>
              <CompanyCard company={leadData.company} lead={leadData.lead} />
              <LeadAnalysisCard analysis={leadData.analysis} />
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default App