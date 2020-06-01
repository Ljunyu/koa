import koaCombineRouters from 'koa-combine-routers'
import routers from './PublicRouter'
import rooter from './logincontroller'
export default koaCombineRouters(
    routers,
    rooter
)