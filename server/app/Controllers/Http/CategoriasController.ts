import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from '../../Models/Categoria'
import Database from '@ioc:Adonis/Lucid/Database'

export default class CategoriasController {
  public async create({ request }: HttpContextContract) {
    const { descricao } = request.body()

    const categoria = await Categoria.create({ descricao })

    return categoria
  }

  public async update({ request, response }: HttpContextContract) {
    const { id, descricao } = request.body()

    try {
      const categoria = await Categoria.findBy('id', id)

      if (!categoria) {
        return
      }

      categoria.descricao = descricao

      await categoria.save()

      return categoria
    } catch (erro) {
      response.status(401).send('Cadastro não locazado!')
    }
  }

  public async delete({ request }: HttpContextContract) {
    const { id } = request.qs()

    const categoria = await Categoria.find(id)

    if (categoria) {
      await categoria.delete()
      return {
        categoriaDeleted: true,
      }
    }

    return {
      categoriaDeleted: false,
    }
  }

  public async index({ request }: HttpContextContract) {
    const { descricao } = request.qs()

    const categorias = await Database.rawQuery(
      `select id, descricao from categorias where descricao like upper('${descricao}%')`
    )

    return categorias.rows
  }
}
