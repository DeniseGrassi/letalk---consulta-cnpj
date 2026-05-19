export function classifySegment(cnaeDescription: string): string {
  const text = cnaeDescription.toLowerCase()

  if (
    text.includes('banco') ||
    text.includes('bancos') ||
    text.includes('financeira') ||
    text.includes('financeiro') ||
    text.includes('crédito') ||
    text.includes('pagamento')
  ) {
    return 'Financeiro'
  }

  if (
    text.includes('comércio') ||
    text.includes('varejista') ||
    text.includes('atacadista')
  ) {
    return 'Comércio'
  }

  if (
    text.includes('restaurante') ||
    text.includes('alimentação') ||
    text.includes('lanchonete') ||
    text.includes('padaria')
  ) {
    return 'Alimentação'
  }

  if (
    text.includes('tecnologia') ||
    text.includes('software') ||
    text.includes('informática') ||
    text.includes('desenvolvimento')
  ) {
    return 'Tecnologia'
  }

  if (
    text.includes('serviço') ||
    text.includes('serviços') ||
    text.includes('consultoria') ||
    text.includes('administração')
  ) {
    return 'Serviços'
  }

  if (
    text.includes('saúde') ||
    text.includes('clínica') ||
    text.includes('médica') ||
    text.includes('odontológica')
  ) {
    return 'Saúde'
  }

  if (
    text.includes('educação') ||
    text.includes('ensino') ||
    text.includes('escola') ||
    text.includes('faculdade')
  ) {
    return 'Educação'
  }

  return 'Outros'
}