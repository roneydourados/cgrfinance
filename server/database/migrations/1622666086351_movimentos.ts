import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Movimentos extends BaseSchema {
  protected tableName = 'movimentos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.increments('id').primary()
      table.integer('pessoa_id').notNullable().references('pessoas.id').index('idx_mov_pessoa_id')
      table.integer('parcela').notNullable().defaultTo(this.raw('1'))
      table.date('emissao').notNullable().index('idx_mov_emissao')
      table.date('vencimento').notNullable().index('idx_mov_vencimento')
      table.double('valor_nominal').notNullable().defaultTo(this.raw('0'))
      table.double('valor_aberto').notNullable().defaultTo(this.raw('0'))
      table.double('valor_pago').notNullable().defaultTo(this.raw('0'))
      table.double('juros').notNullable().defaultTo(this.raw('0'))
      table.double('multa').notNullable().defaultTo(this.raw('0'))
      table.string('tipo_mov', 1).notNullable().defaultTo(this.raw("'D'")).index('idx_mov_tipo')
      table.string('status', 1).notNullable().defaultTo(this.raw("'A'")).index('idx_mov_status')
      table.string('observacao')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
