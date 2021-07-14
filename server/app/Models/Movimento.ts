import { DateTime } from 'luxon'

import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Movimento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public pessoa_id: number

  @column()
  public categoria_id: number

  @column()
  public parcela: number

  @column()
  public emissao: Date

  @column()
  public vencimento: Date

  @column()
  public valor_nominal: number

  @column()
  public valor_aberto: number

  @column()
  public valor_pago: number

  @column()
  public juros: number

  @column()
  public multa: number

  @column()
  public status: string

  @column()
  public tipo_mov: string

  @column()
  public observacao: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
