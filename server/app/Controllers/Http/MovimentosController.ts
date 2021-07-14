import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Redis from '@ioc:Adonis/Addons/Redis'
import Movimento from '../../Models/Movimento'

export default class MovimentosController {
  public async create({ request }: HttpContextContract) {
    const {
      pessoa_id,
      categoria_id,
      parcela,
      emissao,
      vencimento,
      valor_nominal,
      valor_aberto,
      valor_pago,
      juros,
      multa,
      status,
      observacao,
      tipo_mov,
    } = request.body()

    const movimento = await Movimento.create({
      pessoa_id,
      categoria_id,
      parcela,
      emissao,
      vencimento,
      valor_nominal,
      valor_aberto,
      valor_pago,
      juros,
      multa,
      status,
      observacao,
      tipo_mov,
    })

    const redisKey = 'allMovimentos:'
    const keys = await Redis.keys(`${redisKey}:*`)
    const pipeline = Redis.pipeline()

    keys.forEach((key) => {
      pipeline.del(key)
    })

    await pipeline.exec()

    return movimento
  }

  public async update({ request, response }: HttpContextContract) {
    const {
      id,
      pessoa_id,
      categoria_id,
      parcela,
      emissao,
      vencimento,
      valor_nominal,
      valor_aberto,
      valor_pago,
      juros,
      multa,
      status,
      observacao,
      tipo_mov,
    } = request.body()

    try {
      const movimento = await Movimento.findBy('id', id)

      if (!movimento) {
        return
      }

      await movimento
        .merge({
          pessoa_id,
          categoria_id,
          parcela,
          emissao,
          vencimento,
          valor_nominal,
          valor_aberto,
          valor_pago,
          juros,
          multa,
          status,
          observacao,
          tipo_mov,
        })
        .save()

      const redisKey = 'allMovimentos'
      const keys = await Redis.keys(`${redisKey}:*`)
      const pipeline = Redis.pipeline()

      keys.forEach((key) => {
        pipeline.del(key)
      })

      await pipeline.exec()

      return movimento
    } catch (error) {
      return response.status(204).send({ error: 'Movimento não localizado!' })
    }
  }

  public async delete({ request }: HttpContextContract) {
    const { id } = request.qs()

    const movimento = await Movimento.find(id)

    if (movimento) {
      await movimento.delete()
      return {
        movimentoDeleted: true,
      }
    }

    return {
      movimentoDeleted: false,
    }
  }

  public async index({ request, auth }: HttpContextContract) {
    const { data_inicial, data_final, tipo_mov, pessoa_id } = request.qs()

    let where: string

    where = ''

    if (tipo_mov) {
      where = ` and m.tipo_mov = '${tipo_mov}'`
    }

    if (pessoa_id) {
      where = ` and m.pessoa_id = '${pessoa_id}'`
    }

    const redisKey = `allMovimentos:${
      auth.use('api').user?.id
    }-${data_inicial}-${data_final}${where}`

    //verificar se já existe cache de dados
    const value = await Redis.get(String(redisKey))

    if (value) {
      return value
    }

    const movimentos = await Database.rawQuery(
      'select  m.id, m.emissao , m.vencimento, m.parcela, m.valor_nominal, ' +
        'm.valor_aberto, m.valor_pago,  p.nome pessoa, c.descricao categoria, m.tipo_mov ' +
        ' from movimentos m join pessoas p on p.id  = m.pessoa_id ' +
        ' left join categorias c on c.id = m.categoria_id ' +
        ` where m.status = 'A' and m.vencimento between '${data_inicial}' and '${data_final}' ${where}`
    )

    //setar cache de dados
    await Redis.set(String(redisKey), JSON.stringify(movimentos.rows))

    return movimentos.rows
  }

  public async indexDashboard() {
    const movimentos = await Database.rawQuery(
      '  select ' +
        `  sum(case when tipo_mov = 'C' then valor_aberto else 0 end) as totalcredito, ` +
        `  sum(case when tipo_mov = 'D' then valor_aberto else 0 end) as totaldebito ` +
        'from movimentos ' +
        `where status = 'A' `
    )

    return movimentos.rows
  }
}
