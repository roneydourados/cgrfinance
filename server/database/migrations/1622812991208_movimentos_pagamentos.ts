import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MovimentosPagamentos extends BaseSchema {
  protected tableName = 'movimentos_pagamentos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('movimento_id')
        .notNullable()
        .references('movimentos.id')
        .onDelete('cascade')
        .index('idx_movpgto_movimento')
      table
        .integer('forma_pagamento_id')
        .notNullable()
        .references('formas_pagamentos.id')
        .index('idx_movpgto_forma_pagamento')
      table.double('valor_aberto').notNullable().defaultTo(this.raw('0'))
      table.double('valor_juros').notNullable().defaultTo(this.raw('0'))
      table.double('valor_multa').notNullable().defaultTo(this.raw('0'))
      table.double('valor_realizado').notNullable().defaultTo(this.raw('0'))
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
