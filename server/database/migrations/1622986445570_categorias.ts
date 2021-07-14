import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Categorias extends BaseSchema {
  protected tableName = 'categorias'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('descricao').notNullable().index('idx_categoria_descricao')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
