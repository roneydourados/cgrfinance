import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'

export default class UsersController {
  public async create({ request }: HttpContextContract) {
    const { nome, email, password, avatar_url } = request.body()

    const user = await User.create({
      nome,
      email,
      password,
      avatar_url,
    })

    return user
  }

  public async index() {
    const users = await User.all()

    return users
  }

  public async update({ request }: HttpContextContract) {
    const { id, nome, email, password, avatar_url } = request.body()

    const user = await User.findBy('id', id)

    if (!user) {
      throw new Error('Nenhum usuário localizado!')
    }

    user.email = email
    user.nome = nome
    user.avatar_url = avatar_url

    if (password) {
      user.password = password
    }

    await user.save()

    return user
  }
}
