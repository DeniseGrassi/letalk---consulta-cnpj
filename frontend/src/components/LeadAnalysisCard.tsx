import type { LeadResult } from '../types/lead'

type LeadAnalysisCardProps = {
    analysis: LeadResult['analysis']
}

export function LeadAnalysisCard({ analysis }: LeadAnalysisCardProps) {
    return (
        <section className="card analysis-card">
            <div className="priority-header">
                <span>Análise comercial</span>
                <strong className={`priority ${analysis.priority.toLowerCase()}`}>
                    {analysis.priority}
                </strong>
            </div>

            <p>{analysis.summary}</p>

            <div>
                <strong>Por que essa prioridade?</strong>
                <ul>
                    {analysis.reasons.map((reason) => (
                        <li key={reason}>{reason}</li>
                    ))}
                </ul>
            </div>
        </section>
    )
}