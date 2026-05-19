import { Request, Response } from 'express'
import axios from 'axios'
import { enrichLeadWithCnpjData } from '../services/cnpjService'
import { isValidCnpj, removeCnpjMask } from '../utils/cnpjValidator'

export async function enrichLead(request: Request, response: Response) {
    const { name, email, phone, cnpj } = request.body

    if (!name || !email || !phone || !cnpj) {
        return response.status(400).json({
            message: 'Preencha todos os campos obrigatórios.'
        })
    }

    const cleanCnpj = removeCnpjMask(cnpj)

    if (!isValidCnpj(cleanCnpj)) {
        return response.status(400).json({
            message: 'CNPJ inválido. Verifique o número informado.'
        })
    }

    try {
        const enrichedLead = await enrichLeadWithCnpjData({
            name,
            email,
            phone,
            cnpj: cleanCnpj
        })

        return response.json(enrichedLead)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return response.status(502).json({
                message: 'Não foi possível consultar os dados da empresa no momento.'
            })
        }

        return response.status(500).json({
            message: 'Erro inesperado ao enriquecer os dados do lead.'
        })
    }
}