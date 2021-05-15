import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import view from '@ioc:Adonis/Core/View'
import Link from 'App/Models/Link'
export default class Dashboard {
  public index(ctx: HttpContextContract){
    return view.render('dashboard', {udata: JSON.parse(ctx.session.get('user_data'))});
  }
  async addUrl(ctx: HttpContextContract){
    const db = new Link()
    db.longurl = ctx.request.input('lurl')
    db.alias = ctx.request.input('alias')
    await db.save()
    return db.$isPersisted
  }
  async delUrl(ctx: HttpContextContract){
    const db = await Link.findOrFail(ctx.request.input('id'))
    await db.delete()
    
  }
  async linkHandler(ctx: HttpContextContract){
    const url = await Link.findBy('alias', ctx.params.url_key)
    if(!url){
      return ctx.response.status(404)
    }
    // return url.longurl
    return view.render('redirect', {url: url.longurl})
  }
}
