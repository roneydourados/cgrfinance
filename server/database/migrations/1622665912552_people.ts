import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class People extends BaseSchema {
  protected tableName = 'pessoas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()')) aqui quando quer gerar um uuid
      table.increments('id').primary()
      table.string('nome').notNullable().index('idx_pessoa_nome')
      table.string('razao_social').index('idx_pessoa_razao_social')
      table.string('cpf_cnpj').nullable()
      table.string('tipo_pessoa').notNullable().defaultTo(this.raw("'F'"))
      table.string('cep')
      table.string('endereco')
      table.string('numero')
      table.string('bairro')
      table.string('cidade')
      table.string('uf')
      table.string('telefone_fixo')
      table.string('celular').index('idx_pessoa_celular')
      table.string('email').index('idx_pessoa_email')
      table
        .string('tipo_cadastro', 1)
        .notNullable()
        .defaultTo(this.raw("'A'"))
        .index('idx_pessoa_fornecedor')
      table.string('status', 1).notNullable().defaultTo(this.raw("'A'")).index('idx_pessoa_status')
      table.string('observacao')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
