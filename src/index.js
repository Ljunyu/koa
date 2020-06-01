import Koa from 'koa'
import JWT from 'koa-jwt'
import cors from '@koa/cors'
import path from 'path'
import koabody from 'koa-body'
import json from 'koa-json'
import helmet from 'koa-helmet'
import routes from './routes/routes'
import statics from 'koa-static'
import conpos from 'koa-compose'
import compress from 'koa-compress'
import errhandle from './commog/Errhanle'
import config from './config/index'
const app=new Koa()
const isnove=(process.env.NODE_ENV==='production'?false:true)
const jws=(JWT({ secret: config.secret }).unless({path:[/^\/public/,/\/login/,/\/getCaptcha/]}));
const midewell=conpos([
    koabody(),
    cors(),
    json({ pretty:false,param:'pretty'}),
    helmet(),
    statics(path.join(__dirname,'../public')),
    errhandle,
    jws,
])
if(!isnove){
    app.use(compress())
}
app.use(midewell).listen(3000)
app.use( routes())