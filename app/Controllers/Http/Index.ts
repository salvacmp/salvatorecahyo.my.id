import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import view from '@ioc:Adonis/Core/View'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { schema } from '@ioc:Adonis/Core/Validator'
export default class Index {
    public index(){
        return view.render('welcome')
    }
    public login(){
      return view.render('login')
    }
    public async post(ctx: HttpContextContract){
      // console.log(ctx.request.all())
      const newUserSchema = schema.create({
        username: schema.string(),
        password: schema.string(),
      })
      try {
        ctx.request.validate({
          schema: newUserSchema
        })
        const username = ctx.request.input('username')
        const password = ctx.request.input('password')
        const userdb = await User.findBy('username', username)
        // console.log(userdb['password'])
        if(!userdb){
          return { status: "Invalid Username"}
        }else if(await Hash.verify(userdb["password"], password)){
          ctx.session.put('user_data', JSON.stringify(userdb))
          ctx.response.send({status: 200})

        }else{
          return { status: "Invalid Password"}
        }
        } catch (error) {
          return { status: "Invalid Input"}
        }

    }
    public signout(ctx: HttpContextContract){
      ctx.session.forget('user_data')
      return ctx.response.redirect('/login')
    }
}
