import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class SessionsController {
  //autentica e gera o token para o usuário
  public async auth({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.body()

    // Localizar o usuário no banco de dados
    const user = await User.query().where('email', email).firstOrFail()

    // Validar senha
    if (!(await Hash.verify(user.password, password))) {
      return response.badRequest('Invalid user or password!')
    }

    // Generate token, validade de 1 dia
    const { token } = await auth.use('api').generate(user, {
      expiresIn: '1days',
    })

    // return token and user
    return response.json({ user, token })
  }

  // faz o logoff e revoga o token
  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()

    return {
      tokenRevoked: true,
    }
  }
}
