import send from '../config/MailConfig'
import bcrypt from 'bcrypt'
import mount from 'moment'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config/index'
import {iscode} from '../commog/utils'
import mongods from '../model/User'
import errhandle from '../commog/Errhanle'
import moment from 'moment'
class logincontroller{
    constructor (){ }
    async forget(ctx){
        const { body } =ctx.request
        try {
            console.log
            let result = await send({
                     email:body.username,
                     subject:'开发者你好',
                     expire:mount().add(30,'minutes').format('YYYY-MM-DD HH:mm:ss'),
                     code:'2020'
            })
            ctx.body={
                code:200,
                data:result,
                msg:'成功发送邮件'
            }
        }
        catch (e) {
            console.log('发送邮件失败请检查',e)
            errhandle()
        }
    }
    async fanhui(ctx){
        const {body} = ctx.request
        console.log(1)
        console.log(body)
        ctx.body={
            ...body
        }
    }
    async login(ctx){
        //接受用户数据
        const { body } =ctx.request
        //验证码时效性和正确性
        console.log(1234,body)
        let sid=body.uuid
        let code=body.code
        
        if( await iscode(sid,code)){
            let user=await mongods.findon({emali:body.username})
            if(user[0].password==body.password){
                let cheuser=false
                cheuser=true
                console.log('cheuser',cheuser)
                if(cheuser==true){
                    //返回token
                    var token = jsonwebtoken.sign({ _id:'ljy',exp:Math.floor(Date.now() / 1000) - 30},config.secret);
                    ctx.body={
                        code:200,
                        token:token
                    }
                }
            }else{
                    ctx.body={
                        code:401,
                        msg:'用户名或密码错误'
                    }
                }
           }else{
           ctx.body={
                msg:'验证码错误请检查',
                code:401
            }
        }
        //检验用户账号密码是否正确
      }
    async redylogin(ctx){
        const { body } =ctx.request
         let sid=body.uuid
         let code=body.code
         let check=true
         let msg={}
       if( await iscode(sid,code)){
           console.log(121,body)
           let username1=await mongods.findon({emali:body.username})
            //返回的是数组格式 吃大亏
           if( username1!== null && typeof username1.emali !== 'undefined'){
               msg.username=['此邮箱已被注册，通过邮箱找回']
               check=false
           }
            let name1=await mongods.findon({name:body.name})
            console.log(3332222,name1)

            if( name1!== null && typeof name1.name !== 'undefined'){
                msg.name=['此邮箱已被注册，通过邮箱找回']
                check=false
            }
            console.log(check)
            //写入数据库
            if( check===true){
                body.password=await bcrypt.hash(body.password,5)
                let user=await mongods.inserton({
                    emali:body.username,
                    name:body.name,
                    password:body.password,
                    created:moment().format('YYYY-MM-DD HH:mm:ss')
                })
                console.log(11,user)
                ctx.body={
                    code:200,
                    data:user,
                    msg:'注册成功'
                }
                return
            }
        }
        else{
                msg.code=['验证码失效']
        }
        ctx.body={
            code:500,
            msg:msg
        }
    }

}

export default new logincontroller
   