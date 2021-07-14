import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MovimentoPagamento from '../../Models/MovimentoPagamento'

export default class MovimentoPagamentosController {
  public async create({ request }: HttpContextContract) {
    const {
      movimento_id,
      forma_pagamento_id,
      valor_aberto,
      valor_juros,
      valor_multa,
      valor_realizado,
    } = request.body()

    const movPagamento = await MovimentoPagamento.create({
      movimento_id,
      forma_pagamento_id,
      valor_aberto,
      valor_juros,
      valor_multa,
      valor_realizado,
    })

    return movPagamento
  }

  public async index({ request }: HttpContextContract) {
    const { movimento_id } = request.qs()

    const movPgto = await MovimentoPagamento.query()
      .where('movimento_id', '=', movimento_id)
      .preload('formaPagamento')

    return movPgto
  }
}
