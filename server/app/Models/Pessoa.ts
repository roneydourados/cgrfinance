import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Pessoa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public razao_social: string

  @column()
  public cpf_cnpj: string

  @column()
  public tipo_pessoa: string

  @column()
  public cep: string

  @column()
  public endereco: string

  @column()
  public bairro: string

  @column()
  public numero: string

  @column()
  public cidade: string

  @column()
  public uf: string

  @column()
  public telefone_fixo: string

  @column()
  public celular: string

  @column()
  public email: string

  @column()
  public tipo_cadastro: string

  @column()
  public status: string

  @column()
  public observacao: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
