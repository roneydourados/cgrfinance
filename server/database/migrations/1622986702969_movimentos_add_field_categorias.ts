import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MovimentosAddFieldCategorias extends BaseSchema {
  protected tableName = 'movimentos'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('categoria_id').references('categorias.id').index('idx_movimento_categoria')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('categoria_id')
    })
  }
}
