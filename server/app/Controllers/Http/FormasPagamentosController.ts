import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FormasPagamento from '../../Models/FormasPagamento'

export default class FormasPagamentosController {
  public async create({ request }: HttpContextContract) {
    const { descricao } = request.body()

    const formaPagamento = await FormasPagamento.create({ descricao })

    return formaPagamento
  }

  public async update({ request, response }: HttpContextContract) {
    const { id, descricao } = request.body()

    try {
      const formaPagamento = await FormasPagamento.findBy('id', id)

      if (!formaPagamento) {
        return
      }

      formaPagamento.descricao = descricao

      await formaPagamento.save()

      return formaPagamento
    } catch (erro) {
      response.status(401).send('Cadastro não locazado!')
    }
  }

  public async delete({ request }: HttpContextContract) {
    const { id } = request.qs()

    const formaPagamento = await FormasPagamento.find(id)

    if (formaPagamento) {
      await formaPagamento.delete()
      return {
        formaPagamentoDeleted: true,
      }
    }

    return {
      formaPagamentoDeleted: false,
    }
  }

  public async index() {
    const formasPagamentos = await FormasPagamento.all()

    return formasPagamentos
  }
}
