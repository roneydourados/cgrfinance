import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Redis from '@ioc:Adonis/Addons/Redis'
import Pessoa from '../../Models/Pessoa'
import Database from '@ioc:Adonis/Lucid/Database'

export default class PessoasController {
  public async create({ request }: HttpContextContract) {
    const {
      nome,
      razao_social,
      cpf_cnpj,
      celular,
      email,
      cep,
      endereco,
      bairro,
      numero,
      cidade,
      uf,
      observacao,
      tipo_cadastro,
      status,
      tipo_pessoa,
      telefone_fixo,
    } = request.body()

    //validação cpf ou cnpj se ja existe
    if (cpf_cnpj) {
      const cpfcnpj = await Pessoa.findBy('cpf_cnpj', cpf_cnpj)

      if (cpfcnpj && cpfcnpj.cpf_cnpj !== '') {
        throw new Error(`Já existe um cadastro: ${cpfcnpj.nome} com cpf/cnpj: ${cpf_cnpj}`)
      }
    }

    const pessoa = await Pessoa.create({
      nome,
      razao_social,
      cpf_cnpj,
      celular,
      cep,
      cidade,
      email,
      endereco,
      bairro,
      numero,
      observacao,
      tipo_cadastro,
      status,
      tipo_pessoa,
      telefone_fixo,
      uf,
    })

    const redisKey = 'allPessoas'
    const keys = await Redis.keys(`${redisKey}:*`)
    const pipeline = Redis.pipeline()

    keys.forEach((key) => {
      pipeline.del(key)
    })

    await pipeline.exec()

    return pessoa
  }

  public async update({ request }: HttpContextContract) {
    const {
      id,
      nome,
      razao_social,
      cpf_cnpj,
      celular,
      email,
      cep,
      endereco,
      bairro,
      numero,
      cidade,
      uf,
      observacao,
      tipo_cadastro,
      status,
      tipo_pessoa,
      telefone_fixo,
    } = request.body()

    const pessoa = await Pessoa.find(id)

    if (!pessoa) {
      throw new Error('Nenhum cadastro localizado!')
    }

    //validação cpf ou cnpj se ja existe
    if (cpf_cnpj) {
      console.log(cpf_cnpj)
      const cpfcnpj = await Pessoa.findBy('cpf_cnpj', cpf_cnpj)

      if (cpfcnpj && cpfcnpj.id !== id && cpfcnpj.cpf_cnpj !== '') {
        throw new Error(`Já existe um cadastro: ${cpfcnpj.nome} com cpf/cnpj enviado!`)
      }
    }

    await pessoa
      .merge({
        nome,
        razao_social,
        cpf_cnpj,
        celular,
        email,
        cep,
        endereco,
        bairro,
        numero,
        cidade,
        uf,
        observacao,
        tipo_cadastro,
        status,
        tipo_pessoa,
        telefone_fixo,
      })
      .save()

    const redisKey = 'allPessoas'
    const keys = await Redis.keys(`${redisKey}:*`)
    const pipeline = Redis.pipeline()

    keys.forEach((key) => {
      pipeline.del(key)
    })

    await pipeline.exec()

    return pessoa
  }

  public async delete({ request }: HttpContextContract) {
    const { id } = request.qs()

    const pessoa = await Pessoa.find(id)

    if (pessoa) {
      await pessoa.delete()

      //invalidar cache
      const redisKey = 'allPessoas'
      const keys = await Redis.keys(`${redisKey}:*`)
      const pipeline = Redis.pipeline()

      keys.forEach((key) => {
        pipeline.del(key)
      })

      await pipeline.exec()

      return {
        pessoaDeleted: true,
      }
    }

    return {
      pessoaDeleted: false,
    }
  }

  public async index({ request, auth }: HttpContextContract) {
    const { filtro, campo } = request.qs()

    let swhere: string
    let order: string

    swhere = ''

    if (filtro) {
      swhere = filtro
    }

    order = 'order by p.id desc'

    if (campo && filtro) {
      order = `order by p.${campo}`
    }

    //verificar se já existe cache de dados
    const redisKey = `allPessoas:${auth.use('api').user?.id}-${swhere}-${order}-${campo}`
    const value = await Redis.get(String(redisKey))

    if (value) {
      return value
    }

    const pessoas = await Database.rawQuery(
      `select * from pessoas p where 1 = 1 ${swhere} ${order}`
    )

    await Redis.set(String(redisKey), JSON.stringify(pessoas.rows))

    return pessoas.rows
  }
}
