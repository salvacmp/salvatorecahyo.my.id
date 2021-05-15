import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class LoggedIn {
  public async handle (ctx: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    if(ctx.session.get('user_data') == undefined){
      ctx.response.redirect().toPath('/login')
    }else{
      await next()
    }
  }
}
