export function estimateEmployees(companySize?: string): string {
  if (!companySize) {
    return 'Não informado'
  }

  const size = companySize.toLowerCase()

  if (size.includes('mei')) {
    return '1 funcionário'
  }

  if (size.includes('micro')) {
    return '1 a 9 funcionários'
  }

  if (size.includes('pequeno') || size.includes('pequena')) {
    return '10 a 49 funcionários'
  }

  if (size.includes('médio') || size.includes('media') || size.includes('média')) {
    return '50 a 99 funcionários'
  }

  if (size.includes('grande')) {
    return '100+ funcionários'
  }

  return 'Não informado'
}