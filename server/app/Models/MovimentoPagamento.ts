import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

import FormasPagamento from './FormasPagamento'

export default class MovimentoPagamento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public movimento_id: number

  @column()
  public forma_pagamento_id: number

  @column()
  public valor_aberto: number

  @column()
  public valor_juros: number

  @column()
  public valor_multa: number

  @column()
  public valor_realizado: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => FormasPagamento, { foreignKey: 'forma_pagamento_id' })
  public formaPagamento: BelongsTo<typeof FormasPagamento>
}
