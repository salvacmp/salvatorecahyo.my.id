import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class Guest {

  public async handle (ctx: HttpContextContract, next: () => Promise<void>) {
    if(ctx.session.get('user_data') !== undefined){
      ctx.response.redirect().toPath('/dashboard')
    }else{
      await next()
    }

  }
}
