import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FormasPagamentos extends BaseSchema {
  protected tableName = 'formas_pagamentos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('descricao').notNullable()
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
