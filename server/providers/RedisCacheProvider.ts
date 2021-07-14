import Redis from '@ioc:Adonis/Addons/Redis'

export default class RedisCacheProvider {
  public async get(key: string): Promise<void> {
    await Redis.get(key)
  }

  public async save(key: string, value: any): Promise<void> {
    await Redis.set(key, JSON.stringify(value))
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await Redis.keys(`${prefix}:*`)

    const pipeline = Redis.pipeline()

    keys.forEach((key) => {
      pipeline.del(key)
    })

    await pipeline.exec()
  }
}
