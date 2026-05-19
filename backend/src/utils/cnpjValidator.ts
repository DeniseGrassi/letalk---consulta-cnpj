export function removeCnpjMask(cnpj: string): string {
  return cnpj.replace(/\D/g, '')
}

export function isValidCnpj(cnpj: string): boolean {
  const cleanCnpj = removeCnpjMask(cnpj)

  if (cleanCnpj.length !== 14) {
    return false
  }

  if (/^(\d)\1+$/.test(cleanCnpj)) {
    return false
  }

  const calculateDigit = (base: string, weights: number[]) => {
    const sum = base
      .split('')
      .reduce((acc, digit, index) => acc + Number(digit) * weights[index], 0)

    const rest = sum % 11

    return rest < 2 ? 0 : 11 - rest
  }

  const firstDigit = calculateDigit(
    cleanCnpj.slice(0, 12),
    [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  )

  const secondDigit = calculateDigit(
    cleanCnpj.slice(0, 13),
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  )

  return cleanCnpj.endsWith(`${firstDigit}${secondDigit}`)
}